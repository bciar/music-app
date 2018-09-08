const express = require('express');
const UserController = require('./user.controller');

const router = express.Router();

const user = new UserController();

router.get('/', user.index);

module.exports = router;