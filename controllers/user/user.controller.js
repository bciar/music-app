const jwt = require('jsonwebtoken');
var userInfo = {
  loggedin: false,
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
    if (req.body.token) {
      userInfo = {
        loggedin: false,
        token: '',
        mode: ''
      };
      userInfo.loggedin = true;
      userInfo.token = req.body.token;
      userInfo.mode = 'Apple';
      let jwtSignData = userInfo

      let jwtSignOptions = {
        expiresIn: config.jwt.expireTime,
        algorithm: config.jwt.algorithm
      };

      let authToken = jwt.sign(jwtSignData, config.jwt.secretKey, jwtSignOptions);
      res.cookie('token', authToken);
      res.redirect('/home');
    } else {
      res.redirect('/login');
    }
  }

  loginWithSportify(req, res) {
    if (req.body.token) {
      userInfo = {
        loggedin: false,
        token: '',
        mode: ''
      };
      userInfo.loggedin = true;
      userInfo.token = req.body.token;
      userInfo.mode = 'Sportify';
      let jwtSignData = userInfo

      let jwtSignOptions = {
        expiresIn: config.jwt.expireTime,
        algorithm: config.jwt.algorithm
      };

      let authToken = jwt.sign(jwtSignData, config.jwt.secretKey, jwtSignOptions);
      res.cookie('token', authToken);
      res.redirect('/home');
    } else {
      res.redirect('/login');
    }
  }

  loginWithSportifyRedirect(req, res) {
    res.render('pages/login-sportify');
  }

  logout(req, res) {
    userInfo = {
      loggedin: false,
      token: '',
      mode: ''
    };
    userInfo = {
      loggedin: false,
      token: '',
      mode: ''
    };
    let jwtSignData = userInfo
    let jwtSignOptions = {
      expiresIn: config.jwt.expireTime,
      algorithm: config.jwt.algorithm
    };

    let authToken = jwt.sign(jwtSignData, config.jwt.secretKey, jwtSignOptions);
    res.cookie('token', authToken);
    res.redirect('/');
  }

}

module.exports = StoreController;