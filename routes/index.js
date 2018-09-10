const express = require('express');
const MainController = require('../controllers/main.controller');
const UserController = require('../controllers/user/user.controller');
const main = new MainController();
const user = new UserController();
const router = express.Router();

router.get('/', main.landing);
router.use('/home', userAuth, require('../controllers/home'));
router.use('/radio', userAuth, require('../controllers/radio'));
router.use('/store', userAuth, require('../controllers/store'));
router.get('/recently-played', userAuth, main.recent);
router.get('/songs', userAuth, main.songs);
router.get('/albums', userAuth, main.albums);
router.get('/artists', userAuth, main.artists);
router.get('/purchased', userAuth, main.purchased);
router.get('/my-like', userAuth, main.myLike);
router.get('/single-artist', userAuth, main.singleArtist);
router.get('/single-playlist', userAuth,main.singlePlaylist);

router.use('/user', userAuth, require('../controllers/user'));
router.get('/login', user.loginView);
router.post('/loginWithApple', user.loginWithApple);
router.get('/logout', user.logout);

router.use('/api', require('../api'));


function userAuth(req, res, next) {
  user.getLoggedinUserInfo().then(userInfo => {
    console.log('UserINONONONONONONON');
    console.log(userInfo);
    if(userInfo == '' || userInfo == null) {
      res.redirect('/');
    }
    if(userInfo.loggedin == true) {
      next();  
    } else {
      res.redirect('/');
    }
  })
  
  
}
    
module.exports = router;