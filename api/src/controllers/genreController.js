require("dotenv").config();
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;

const { Genre } = require('../db');


// Ruta GET /teams
const getGenreList = async (id, name, userId) => {
    try {
        const genreApi = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data;

        const genreArr = genreApi.map((genre) => {
            return {
                id: genre.id,
                name: genre.name,
            };
        });

        const genreDB = await Genre.findAll({
            attributes: ["id", "name"]
        });

        if (!genreDB.length) {
            await Genre.bulkCreate(genreArr);
        }

        const newGenreDB = await Genre.findAll();

        return { genreArr, newGenreDB };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getGenreList,
};