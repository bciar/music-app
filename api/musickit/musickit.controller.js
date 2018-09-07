const api_configs = require('../configs');
const fetch = require('node-fetch');

//Storefront
const url_getAStorefront = `https://api.music.apple.com/v1/storefronts/us`;
const url_getMultipleStorefront = `https://api.music.apple.com/v1/storefronts?ids=us,ca,cn,au,hk`;
const url_getAllStorefront = `GET https://api.music.apple.com/v1/storefronts`;
//ResourceData
//Catalog Album
const url_getACatalogAlbum = `https://api.music.apple.com/v1/catalog/{storefront}/albums/{id}`;
const url_getCatalogAlbumRelationship = `https://api.music.apple.com/v1/catalog/{storefront}/albums/{id}/{relationship}`;
const url_getMultipleCatalogAlbums = `https://api.music.apple.com/v1/catalog/us/albums?ids=310730204,19075891`;

//Get Catalog Charts
const url_getCatalogCharts = `https://api.music.apple.com/v1/catalog/us/charts`;


class MusickitController {
  constructor() {}
  
  index(req, res) {
    // res.send(api_configs.appleJWT);
    res.send('ok');
  }
 
  getDataFetch (url) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'GET',
        headers: {
          'Authorization' : 'Bearer ' + api_configs.appleJWT
        }
      })
      .then(function(response) {
        // let status  = response.status;
        // let statusText = response.statusText;
        // let data = response.body;
        // return res.json({status: statusText, data: data}, status);
        resolve(response);
      }, function (err) {
        reject(err);
      });
    })
    
  }

  //get a Storefront

  getAStorefront(req, res) {
    let url = url_getAStorefront;
    this.getDataFetch(url)
      .then(data => {
        console.log(data.body);
        res.status(data.status).json(data.body);
      })
      .catch(err => {
        res.status(400).json({
          success: false,
          data: err,
          message: 'Failed to retrieve catalog charts.'
        });
      });
  }
  
  //Get Multiple Storefronts
  // Fetch one or more storefronts by using their identifiers.
  getMultipleStorefront(req, res) {

  }

  //Get All Storefronts
  //Fetch all the storefronts in alphabetical order.
  getAllStorefront(req, res) {

  }

  //Get a Catalog Album
  //Fetch an album by using its identifier.
  getACatalogAlbum(req, res) {

  }

  //Get a Catalog Album's Relationship Directly by Name
  //Fetch an album's relationship by using its identifier.
  getCatalogAlbumRelationship(req, res) {

  }

  //Get Multiple Catalog Albums
  //Fetch one or more albums by using their identifiers.
  getMultipleCatalogAlbums(req, res) {

  }

  //Get Catalog Charts
  //Fetch one or more charts from the Apple Music Catalog.
  getCatalogCharts(req, res) {
    let url = url_getCatalogCharts + `?types=songs,albums,playlists&genre=20&limit=1`;
    this.getDataFetch(url)
      .then(data => {
        console.log(data.body);
        res.status(data.status).json(data.body);
      })
      .catch(err => {
        res.status(400).json({
          success: false,
          data: err,
          message: 'Failed to retrieve catalog charts.'
        });
      });
  }


}

module.exports = MusickitController;