const { Router } = require('express');

const gamesRouter = require ('./gamesRouter.js');
const genreRouter = require ('./genresRouter.js');

const router = Router();

router.use('/games', gamesRouter);
router.use('/genres', genreRouter);


module.exports = router;
