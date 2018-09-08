const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const morgan = require('morgan');
// const rootPath = path.normalize(__dirname + '/../../');
const engine = require('ejs-locals');

const router = require('../routes');

module.exports = function (app) {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(express.static("public"));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  app.use('/', router);
  app.engine('ejs', engine);
  app.set('view engine', 'ejs');
  app.set('views', './views');
};
