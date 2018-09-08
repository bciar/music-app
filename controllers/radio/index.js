const express = require('express');
const RadioController = require('./radio.controller');

const router = express.Router();

const radio = new RadioController();

router.get('/', radio.index);
router.get('/featured', radio.featured);
router.get('/genres', radio.genres);

module.exports = router;