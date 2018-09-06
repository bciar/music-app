
const MainController = require('../controllers/main.controller');
const main = new MainController();
module.exports = function(app) {
    app.use('/home', require('../controllers/home'));
    app.use('/radio', require('../controllers/radio'));
    app.use('/store', require('../controllers/store'));
    app.use('/recently-played', main.recent.bind(main));
    app.use('/songs', main.songs.bind(main));
    app.use('/albums', main.albums.bind(main));
    app.use('/artists', main.artists.bind(main));
    app.use('/purchased', main.purchased.bind(main));
    app.use('/my-like', main.myLike.bind(main));
    app.use('/single-artist', main.singleArtist.bind(main));
    app.use('/single-playlist', main.singlePlaylist.bind(main));
}
    