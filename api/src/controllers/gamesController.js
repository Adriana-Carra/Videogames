const axios = require('axios');
require('dotenv').config();
const { Op } = require('sequelize');
const { Videogame, Genre } = require('../db.js');
const { API_KEY } = process.env;


// Ruta GET | /videogames
const getAllGames = async () => {
    try {
        const allGamesDB = await Videogame.findAll({ include: [Genre] });
            
        const gamesApi = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data;
        const gamesAPIFull = gamesApi.results.map((X) => {
            const game = {
                id: X.id,
                name: X.name,
                rating: X.rating,
                source: 'Api',
                image: X.background_image,
                genres: X.genres && X.genres.map((p) => p.name).filter(p => p != null).join(', '),
            };
            return game;
          })
        const allGamesApi = gamesAPIFull;

        return [...allGamesDB, ...allGamesApi];
    } catch (error) {
        throw new Error(error.message);
    }
};

// GET | /videogames/:idVideogame
const getGamesById = async (id, source) => {
    const gameById = source === "api"
        ? (await axios.get(`https://api.rawg.io/api/games/${id}?api_key=${API_KEY}`, { include: [Genre] })).data
        : (await Videogame.findByPk(id, {
            include: {
                genre: Genre,
                attributes: ["id", "name"]
            }
        }));

    return gameById;
};

// Ruta GET | /videogames/name?="..."
const getGameByName = async (name) => {
    try {
        const gamesApi = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`)).data;
        const allGamesApi = infoGet(gamesApi);

        const gamesFiltered = allGamesApi.filter((game) => game.name.toLowerCase().includes(name.toLowerCase()));

        const gameInDB = await Videogame.findAll({
            where: { name: { [Op.iLike]: `%${name}%` } },
            limit: 15
        });

        const uniqueGames = Array.from(new Set([...gamesFiltered, ...gameInDB]));

        return uniqueGames;
    } catch (error) {
        console.error('Error in get games by name:', error.message);
        throw new Error(error.message);
    }
};

//RUTA POST | /videogames
const createGame = async (name, description, image, released, rating, platforms, genres) => {
    try {
        const platformString = platforms.join(', ');
        const response = await Videogame.create({ 
            name,
            description,
            image,
            released,
            rating,
            platforms: platformString,
        });

        for (const genreName of genres) {
            const genre = await Genre.findOne({ where: { name: genreName } });
            if (genre) {
                await response.addGenre(genre);
            } else {
                throw new Error(`Genre '${genreName}' not found`);
            }
        }

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};


module.exports = {
    getAllGames,
    getGamesById,
    getGameByName,
    createGame,
};    