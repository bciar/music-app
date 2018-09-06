
const MainController = require('../controllers/main.controller');
const main = new MainController();
module.exports = function(app) {
    app.use('/home', require('../controllers/home'));
    app.use('/radio', require('../controllers/radio'));
    app.use('/store', require('../controllers/store'));
    app.use('/recently-played', main.recent.bind(main));
    app.use('/songs', main.songs.bind(main));
}
    