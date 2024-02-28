const { Router } = require("express");
const {
    getAllGames,
    getGamesById,
    getGameByName,
    createGame,
} = require("../controllers/gamesController");

const gamesRoutes = Router();

//GET | /videogames**
gamesRoutes.get("/", async (req, res) => {
    try {
        const games = await getAllGames();
        return res.status(200).json(games);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// GET | /videogames/:idVideogame
gamesRoutes.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const gameById = await getGamesById(id, "api");
        return res.status(200).json(gameById);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
});

// Ruta GET | /videogames/name?="..."
gamesRoutes.get("/name", async (req, res) => {
    const { name } = req.query;
    try {
        const gamesByName = await getGameByName(name);
        return res.status(200).json(gamesByName);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

// Ruta POST | /videogames
gamesRoutes.post("/", async (req, res) => {
    const { name, description, image, released, rating, platforms, genres } = req.body;
    try {
        const newGame = await createGame(name, description, image, released, rating, platforms, genres);
        return res.status(201).json(newGame);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
});

module.exports = gamesRoutes;
