const axios = require('axios');
require('dotenv').config();
const { Op } = require('sequelize');
const { Videogame, Genre } = require('../db.js');
const { API_KEY } = process.env;


// Ruta GET | /videogames
const getAllGames = async () => {
    try {
        // Obtener todos los videojuegos de la base de datos local
        const allGamesDB = await Videogame.findAll({ include: [Genre] });
        
        // Obtener todos los videojuegos de la API de Rawg
        const response = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
        const gamesApi = response.data.results.map((game) => ({
            id: game.id,
            name: game.name,
            description: game.description,
            rating: game.rating,
            released: game.released,
            platforms: game.platforms,
            genres: game.genres && game.genres.map((genre) => genre.name).join(', '),
            image: game.background_image
        }));

        // Devolver la combinación de videojuegos de la base de datos y de la API
        return [...allGamesDB, ...gamesApi];
    } catch (error) {
        console.error('Error al obtener todos los videojuegos:', error.message);
        throw new Error('No se pudo obtener todos los videojuegos.');
    }
};
// Ruta GET | /videogames/name?="..."

const getGameByName = async (name) => {
    try {
        // Obtener videojuegos de la API de Rawg
        const responseApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}&page_size=15`);
        const gamesApi = responseApi.data.results.map((game) => ({
            id: game.id,
            name: game.name,
            rating: game.rating, 
            description: game.description,
            platforms: game.platforms,
            image: game.background_image,
            released: game.released,
            genres: game.genres && game.genres.map((genre) => genre.name).filter((genre) => genre != null).join(', ')
        }));
        
        // Obtener videojuegos de la base de datos local
        const allGamesDB = await Videogame.findAll({
            where: { name: { [Op.iLike]: `%${name}%` } },
            include: [Genre],
            limit: 15
        });

        // Combinar resultados de la API y de la base de datos
        const allGames = [...gamesApi, ...allGamesDB];

        // Verificar si se encontraron videojuegos
        if (allGames.length === 0) {
            throw new Error('No se encontraron videojuegos con el nombre especificado.');
        }

        return allGames;
    } catch (error) {
        console.error('Error en la búsqueda de videojuegos por nombre:', error.message);
        throw new Error('No se pudo completar la búsqueda de videojuegos por nombre.');
    }
};

// GET | /videogames/:idVideogame
const getGamesById = async (id, source) => {
    try {
        let gameDetails;

        if (source === 'api') {
            // Obtener detalles del videojuego desde la API de Rawg
            const response = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            const gameData = response.data;

            // Formatear los detalles del videojuego
            gameDetails = {
                id: gameData.id,
                name: gameData.name,
                description: gameData.description,
                rating: gameData.rating,
                released: gameData.released,
                platforms: gameData.platforms,
                genres: gameData.genres && gameData.genres.map(genre => genre.name).join(', ')
            };
        } else {
            // Obtener detalles del videojuego desde la base de datos local
            const game = await Videogame.findByPk(id, {
                include: Genre,
                attributes: ['id', 'name', 'description', 'rating', 'released', 'platforms'],
            });

            // Formatear los detalles del videojuego
            gameDetails = {
                id: game.id,
                name: game.name,
                description: game.description,
                rating: game.rating,
                released: game.released,
                platforms: game.platforms,
                genres: game.Genres.map(genre => genre.name).join(', ')
            };
        }

        return gameDetails;
    } catch (error) {
        console.error('Error al obtener los detalles del videojuego:', error.message);
        throw new Error('No se pudo obtener los detalles del videojuego.');
    }
};

//RUTA POST | /videogames
const createGame = async (req, res) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { name, description, image, released, rating, platforms, genres } = req.body;

        // Verificar si se proporcionaron todos los datos necesarios
        if (!name || !description || !image || !released || !rating || !platforms || !genres) {
            throw new Error('Se deben proporcionar todos los datos necesarios para crear un videojuego.');
        }

        // Convertir plataformas a una cadena separada por comas
        const platformString = platforms.join(', ');

        // Crear el videojuego en la base de datos
        const newGame = await Videogame.create({ 
            name,
            description,
            image,
            released,
            rating,
            platforms: platformString,
        });

        // Relacionar el videojuego con sus géneros indicados
        for (const genreName of genres) {
            const genre = await Genre.findOne({ where: { name: genreName } });
            if (genre) {
                await newGame.addGenre(genre);
            } else {
                // Si no se encuentra el género, lanzar un error
                throw new Error(`El género '${genreName}' no fue encontrado.`);
            }
        }

        // Enviar respuesta de éxito
        res.status(201).json({ message: 'El videojuego se creó exitosamente.', game: newGame });
    } catch (error) {
        // Capturar errores y enviar respuesta de error
        console.error('Error al crear el videojuego:', error.message);
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getAllGames,
    getGamesById,
    getGameByName,
    createGame,
};    