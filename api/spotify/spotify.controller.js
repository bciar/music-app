const request = require("request");
//browse categories
const url_browse_categories = `https://api.spotify.com/v1/browse/categories`;
const url_recommendations = `https://api.spotify.com/v1/recommendations`;
const url_newRelease = `	https://api.spotify.com/v1/browse/new-releases`;
// const userController = 
// var token;
class SportifyController {

  constructor() {

  }

  index(req, res) {
    res.send("ok");
  }

  async getBrowseCategories(req, res) {
    let token = req.body.token;
    request({
      method: 'GET',
      url: url_browse_categories,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }, function (error, response, body) {
      if (error) {
        console.log("error in getting sportify categories.");
        res.status(404).json({
          status: 'error',
          message: 'Oops. Something Wrong.'
        })
      } else {
        console.log("success in getting sportify categories.");
        console.log(body);
        res.status(200).json({
          status: 'OK',
          data: body
        });
      }

    })
  }

  async getRecommendations(req, res) {
    let token = req.body.token;
    request({
      method: 'GET',
      url: url_recommendations,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }, function (error, response, body) {
      if (error) {
        console.log("error in getting sportify recommendations.");
        res.status(404).json({
          status: 'error',
          message: 'Oops. Something Wrong.'
        })
      } else {
        console.log("success in getting sportify recommendations.");
        console.log(body);
        res.status(200).json({
          status: 'OK',
          data: body
        });
      }

    })
  }

  async newRelease(req, res) {
    let token = req.body.token;
    request({
      method: 'GET',
      url: url_newRelease,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }, function (error, response, body) {
      if (error) {
        console.log("error in getting sportify new release.");
        res.status(404).json({
          status: 'error',
          message: 'Oops. Something Wrong.'
        })
      } else {
        console.log("success in getting sportify new release.");
        // parse body
        
        res.status(200).json({
          status: 'OK',
          data: JSON.parse(body)
        });
      }

    })
  }

}

module.exports = SportifyController;