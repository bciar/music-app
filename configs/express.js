const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const morgan = require('morgan');
// const rootPath = path.normalize(__dirname + '/../../');
const engine = require('ejs-locals');
module.exports = function (app) {
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(express.static("public"));
  // app.use(express.static(rootPath + '/api/helpers/email-templates'));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  // app.set('views', rootPath + 'dist');
  app.engine('ejs', engine);
  app.set('view engine', 'ejs');
  app.set('views', './views');
};