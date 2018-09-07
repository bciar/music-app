const api_configs = require('../configs');
const request = require("request");

// -------------- Storefronts --------------------------- //
//Storefront
const url_getAStorefront = `https://api.music.apple.com/v1/storefronts/us`;
const url_getMultipleStorefront = `https://api.music.apple.com/v1/storefronts?ids=us,ca,cn,au,hk`;
const url_getAllStorefront = `GET https://api.music.apple.com/v1/storefronts`;
// -------------- Resource Data  ------------------------- //
// -------------- Fetch Albums  -------------------------- 
const url_getACatalogAlbum = `https://api.music.apple.com/v1/catalog/{storefront}/albums/{id}`; //Get a Catalog Album
const url_getCatalogAlbumRelationship = `https://api.music.apple.com/v1/catalog/{storefront}/albums/{id}/{relationship}`; //Get a Catalog Album's Relationship Directly by Name
const url_getMultipleCatalogAlbums = `https://api.music.apple.com/v1/catalog/us/albums?ids=310730204,19075891`; //Get Multiple Catalog Albums
// -------------- Fetch Music Videos  -------------------------- 
const url_getACatalogMusicVideo = `https://api.music.apple.com/v1/catalog/{storefront}/music-videos/{id}`; //Get a Catalog Music Video
const url_getCatalogVideoRelationship = `https://api.music.apple.com/v1/catalog/{storefront}/music-videos/{id}/{relationship}`; //Get a Catalog Music Video's Relationship Directly by Name
const url_getMultipleCatalogVideosById = `https://api.music.apple.com/v1/catalog/{storefront}/music-videos`; //Get Multiple Catalog Music Videos by ID
const url_getMultipleCatalogVideosByISRC = `https://api.music.apple.com/v1/catalog/{storefront}/music-videos`; //Get Multiple Catalog Music Videos by ISRC
// -------------- Fetch Playlists  -------------------------- 

// -------------- Fetch Songs  -------------------------- 

// -------------- Fetch Stations  -------------------------- 

// -------------- Fetch Artists  -------------------------- 

// -------------- Fetch Curators  -------------------------- 

// -------------- Fetch Activities  -------------------------- 

// -------------- Fetch Apple Curators  -------------------------- 

// -------------- Fetch Genres  -------------------------- 

//--------------  Recent History  ---------------------//

//--------------  iCloud Music Library and Library Playlists  ---------------------//

//--------------  Recommendations  ---------------------//

//--------------  Ratings  ---------------------//

//--------------  Object Models  ---------------------//

//--------------  Get Catalog Charts  ---------------------//
const url_getCatalogCharts = `https://api.music.apple.com/v1/catalog/us/charts`;
// ---------------------- Search ------------------------ //
const url_searchCatalogResources = `https://api.music.apple.com/v1/catalog/us/search`; //Search for Catalog Resources
const url_searchLibraryResources = `https://api.music.apple.com/v1/me/library/search`; //Search for Library Resources
const url_getCatalogSearchHints = `https://api.music.apple.com/v1/catalog/{storefront}/search/hints`; //Get Catalog Search Hints


class MusickitController {
  constructor() { }

  index(req, res) {
    // res.send(api_configs.appleJWT);
    res.send('ok');
  }

  //get a Storefront

  getAStorefront(req, res) {

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

    var options = { 
      method: 'GET',
      url: url_getCatalogCharts + `?types=songs,albums,music-videos,playlists&genre=20&limit=20`,
      headers: 
      { 
        authorization: 'Bearer ' + api_configs.appleJWT
      } 
    };

    request(options, function (error, response, body) {
      if (error) {
        res.status(400).json({
          success: false,
          data: err,
          message: 'Failed to retrieve catalog charts.'
        });
      };
      res.status(200).send(body);
    });

  }

  //Search for Catalog Resources
  //Search the catalog by using a query.
  searchCatalogResources(req, res) {
    var options = {
      method: 'GET',
      url: url_searchCatalogResources + `?term=james+brown&limit=2&types=artists,albums`,
      headers: 
      { 
        authorization: 'Bearer ' + api_configs.appleJWT
      } 
    };
    request(options, function (error, response, body) {
      if (error) {
        res.status(400).json({
          success: false,
          data: err,
          message: 'Failed to search catalog resources.'
        });
      };
      res.status(200).send(body);
    });
  }

  //Search for Library Resources
  //Search the library by using a query.
  searchLibraryResources(req, res) {
    var options = {
      method: 'GET',
      url: url_searchLibraryResources + `?term=U2&types=library-artists`,
      headers: 
      { 
        authorization: 'Bearer ' + api_configs.appleJWT
      } 
    };
    request(options, function (error, response, body) {
      if (error) {
        res.status(400).json({
          success: false,
          data: err,
          message: 'Failed to search catalog resources.'
        });
      };
      res.status(200).send(body);
    });
  }

  //Get Catalog Search Hints
  //Fetch the search term results for a hint.
  getCatalogSearchHints(req, res) {
    var options = {
      method: 'GET',
      url: url_getCatalogSearchHints + `?term=love&limit=10`,
      headers: 
      { 
        authorization: 'Bearer ' + api_configs.appleJWT
      } 
    };
    request(options, function (error, response, body) {
      if (error) {
        res.status(400).json({
          success: false,
          data: err,
          message: 'Failed to search catalog resources.'
        });
      };
      res.status(200).send(body);
    });
  }

}

module.exports = MusickitController;