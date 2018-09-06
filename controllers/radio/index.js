const express = require('express');
const RadioController = require('./radio.controller');

const router = express.Router();

const radio = new RadioController();

router.get('/', radio.index.bind(radio));
router.get('/featured', radio.featured.bind(radio));
router.get('/genres', radio.genres.bind(radio));

module.exports = router;