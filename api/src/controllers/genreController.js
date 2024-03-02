require('dotenv').config();
const axios = require('axios');
const { API_KEY } = process.env;

const { Genre } = require('../db.js');

// Ruta GET /genres
const getGenreList = async () => {
    try {
        // Comprueba si se ha proporcionado una clave API
        if (!API_KEY) {
            throw new Error('API key is missing. Please check your environment variables.');
        }
        // Obtener los géneros de la API de Rawg
        const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const genreApi = response.data.results;

        // Mapear los géneros de la API para formatearlos adecuadamente
        const genreArr = genreApi.map((genre) => ({
            id: genre.id,
            name: genre.name,
        }));

        // Obtener todos los géneros de la base de datos
        const genreDB = await Genre.findAll({ attributes: ["id", "name"] });

        // Verificar si la base de datos está vacía
        if (genreDB.length === 0) {
            // Si la base de datos está vacía, guardar los géneros de la API en la base de datos
            await Genre.bulkCreate(genreArr);
        }

        // Obtener los géneros actualizados de la base de datos
        const newGenreDB = await Genre.findAll({ attributes: ["id", "name"] });

        // Devolver los géneros de la API y los géneros de la base de datos
        return { genreArr, newGenreDB };
    } catch (error) {
        console.error('Error en getGenreList:', error.message);
        throw new Error('No se pudo obtener la lista de géneros.');
    }
};

module.exports = {
    getGenreList,
};