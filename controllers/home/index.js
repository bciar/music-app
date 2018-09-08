const express = require('express');
const HomeController = require('./home.controller');

const router = express.Router();

const home = new HomeController();

router.get('/', home.index);
router.get('/music/new-music', home.newMusic);
router.get('/music/playlist', home.playlist);
router.get('/music/charts', home.charts.bind(home));
router.get('/music/genres', home.genres);
router.get('/music/videos', home.videos);

module.exports = router;