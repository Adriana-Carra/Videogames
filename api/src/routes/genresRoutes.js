const { Router } = require("express");
const { getGenreList } = require("../controllers/genreController");

const genreRoutes = Router();

genreRoutes.get("/genres", async (req, res) => {
    try {
        const genreList = await getGenreList();
        res.status(200).json(genreList);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = genreRoutes;