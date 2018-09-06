const express = require('express');
const HomeController = require('./home.controller');

const router = express.Router();

const home = new HomeController();

router.get('/', home.index.bind(home));
router.get('/music/new-music', home.newMusic.bind(home));
router.get('/music/playlist', home.playlist.bind(home));
router.get('/music/charts', home.charts.bind(home));
router.get('/music/genres', home.genres.bind(home));
router.get('/music/videos', home.videos.bind(home));

module.exports = router;