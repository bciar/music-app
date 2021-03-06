const express = require('express');
const StoreController = require('./store.controller');

const router = express.Router();

const store = new StoreController();

router.get('/', store.index);

module.exports = router;