const { Router } = require("express");
const {
    getAllGames,
    getGamesById,
    getGameByName,
    createGame,
} = require("../controllers/gamesController");

const gamesRouter = Router();

//GET | /videogames**
gamesRouter.get("/", async (req, res) => {
    const { name } = req.query;
    try {
        if(name) {
         const games = await getGameByName(name); 
         res.status(200).json(games);
    }
    else {
        const response= await getAllGames() ;
        res.status(200).json(response)
    }
    }   catch (error) {
       res.status(400).json({ error: error.message });
    }
    });
    

// GET | /videogames/:idVideogame
gamesRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    const source = isNaN(id) ? "bdd" : "api";

    try {
        const gameById = await getGamesById(id, source);
        return res.status(200).json(gameById);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
});

// Ruta POST | /videogames
gamesRouter.post("/", async (req, res) => {
    const { name, description, image, released, rating, platforms, genres } = req.body;
    try {
        const newGame = await createGame(name, description, image, released, rating, platforms, genres);
        return res.status(201).json(newGame);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
});

module.exports = gamesRouter;
