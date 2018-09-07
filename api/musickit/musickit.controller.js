const api_configs = require('../configs');
//Get a Storefront
const url_getStorefront = 'https://api.music.apple.com/v1/storefronts/us';


class MusickitController {
  constructor() {}
  
  index(req, res) {
    res.send(api_configs.appleJWT);
  }

  getStorefront() {

  }
  
}

module.exports = MusickitController;