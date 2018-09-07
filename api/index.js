const express = require('express');
const router = express.Router();

const MusickitController = require('./musickit/musickit.controller');
const SpotifyController = require('./spotify/spotify.controller');

const musickit = new MusickitController;
const spotify = new SpotifyController;

router.get('/musickit', musickit.index.bind(musickit));
router.get('/musickit/getAStorefront', musickit.getAStorefront.bind(musickit));

router.get('/musickit/getCatalogCharts', musickit.getCatalogCharts.bind(musickit));

router.get('/spotify', spotify.index.bind(spotify));

module.exports = router;