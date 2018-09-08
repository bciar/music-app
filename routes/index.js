const express = require('express');
const MainController = require('../controllers/main.controller');
const UserController = require('../controllers/user/user.controller');
const main = new MainController();
const user = new UserController();
const router = express.Router();

router.get('/', main.landing);
router.use('/home', require('../controllers/home'));
router.use('/radio', require('../controllers/radio'));
router.use('/store', require('../controllers/store'));
router.get('/recently-played', main.recent);
router.get('/songs', main.songs);
router.get('/albums', main.albums);
router.get('/artists', main.artists);
router.get('/purchased', main.purchased);
router.get('/my-like', main.myLike);
router.get('/single-artist', main.singleArtist);
router.get('/single-playlist',main.singlePlaylist);

router.use('/user', require('../controllers/user'));
router.get('/login', user.loginView);

router.use('/api', require('../api'));
    
module.exports = router;