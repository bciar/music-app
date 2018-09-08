const express = require('express');
const router = express.Router();

const MusickitController = require('./musickit/musickit.controller');
const SpotifyController = require('./spotify/spotify.controller');

const musickit = new MusickitController;
const spotify = new SpotifyController;

router.get('/musickit', musickit.index);
router.get('/musickit/getAStorefront', musickit.getAStorefront);

router.get('/musickit/getCatalogCharts', musickit.getCatalogCharts);
router.get('/musickit/searchCatalogResources', musickit.searchCatalogResources);
router.get('/musickit/searchLibraryResources', musickit.searchLibraryResources);
router.get('/musickit/getCatalogSearchHints', musickit.getCatalogSearchHints);

router.get('/spotify', spotify.index.bind(spotify));

module.exports = router;