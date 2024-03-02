const { Router } = require("express");
const { getGenreList } = require("../controllers/genreController");

const genreRouter = Router();
genreRouter.get("/", async (req, res) => {
    console.log("Recibida solicitud para obtener la lista de géneros"); // Añade este registro de consola
    try {
        const genreList = await getGenreList();
        res.status(200).json(genreList);
    } catch (error) {
        console.error('Error en la ruta /genres:', error.message);
        res.status(400).json({ error: error.message });
    }
});

module.exports = genreRouter;