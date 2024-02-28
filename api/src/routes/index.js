const { Router } = require('express')

const gamesRoutes = require ('../routes/gamesRoutes.js');
const genresRoutes = require ('../routes/genresRoutes.js');

const router = Router();

router.use('/games', gamesRoutes);
router.use('/genres', genresRoutes); 


module.exports = router;
