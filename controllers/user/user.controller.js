var localStorage = require('localStorage');

var userInfo = {
  loggedin : false,
  token: '',
  mode: ''
};

class StoreController {
  constructor() {}

  index(req, res) {

  }

  loginView(req, res) {
      res.render('pages/login');
  }

  loginWithApple(req, res) {
    if(req.body.token) {
      userInfo = {
        loggedin : false,
        token: '',
        mode: ''
      };
      userInfo.loggedin = true;
      userInfo.token = req.body.token;
      userInfo.mode = 'Apple';
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      res.send('success');
    } else {
      res.send('false');
    }
  }

  logout(req, res) {
    userInfo = {
      loggedin : false,
      token: '',
      mode: ''
    };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    res.redirect('/');
  }

  getLoggedinUserInfo() {
    return new Promise((resolve, reject) => {
      userInfo = JSON.parse(localStorage.getItem('userInfo'));
      resolve(userInfo);
    })
    
  }

}

module.exports = StoreController;