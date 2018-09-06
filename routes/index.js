module.exports = function(app) {
    app.use('/home', require('../controllers/home'));
    app.use('/radio', require('../controllers/radio'));
}