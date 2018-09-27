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
const url_Playlist = `https://api.music.apple.com/v1/me/library/playlists`; //Get All Library Playlists
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

  getPlaylists(req, res) {
    let music_user_token = req.body.music_user_token;
    var options = {
      method: 'GET',
      url: url_Playlist,
      headers:
      {
        'Authorization': 'Bearer ' + api_configs.appleJWT,
        'Music-User-Token': music_user_token
      }
    };
    request(options, function (error, response, body) {
      if (error) {
        console.log("error in getting playlists");
        res.status(404).json({ status: 'Error', message: 'Oops. Something Wrong.' })
      } else {
        console.log("success in getting playlists");
        body = JSON.parse(body);
        let result = [];
        body.data.forEach(playlist => {
            let id = playlist.id;
            let name = playlist.attributes.name;
            let description = playlist.attributes.description.standard;
            result.push({
              id: id,
              name: name,
              description: description
            });
        });
        res.status(200).send(result);
      }
    });
  }

  addPlaylist(req, res) {
    let music_id = req.body.music_id;
    let music_type = req.body.music_type;
    let playlist_id = req.body.playlist_id;
    let music_user_token = req.body.music_user_token;

    request({
      method: 'POST',
      url: url_Playlist + '/' + playlist_id + '/tracks',
      headers: {
        'Authorization': 'Bearer ' + api_configs.appleJWT,
        'Music-User-Token': music_user_token
      },
      json: true,
      body: {
        attributes: {
          name: 'Playlist',
          description: 'Playlist'
        },
        relationships: {
          tracks: {
            data: [
              {
                id: music_id,
                type: music_type + 's'
              }
            ]
          }
        }
      }
    }, function (error, response, body) {
      if (error) {
        console.log("error in adding new playlist");
        res.status(404).json({ status: 'error', message: 'Oops. Something Wrong.' })
      } else {
        console.log("success in adding new playlist");
        res.status(200).json({ status: 'OK', data: body });
      }

    })
  }

  createPlaylist(req, res) {

    let music_id = req.body.music_id;
    let music_type = req.body.music_type;
    let music_user_token = req.body.music_user_token;
    let playlistName = req.body.playlistName;
    let playlistDescription = req.body.playlistDescription;

    request({
      method: 'POST',
      url: url_Playlist,
      headers: {
        'Authorization': 'Bearer ' + api_configs.appleJWT,
        'Music-User-Token': music_user_token
      },
      json: true,
      body: {
        attributes: {
          name: playlistName,
          description: playlistDescription
        },
        relationships: {
          tracks: {
            data: [
              {
                id: music_id,
                type: music_type + 's'
              }
            ]
          }
        }
      }
    }, function (error, response, body) {
      if (error) {
        console.log("error in creating new playlist");
        res.status(404).json({ status: 'error', message: 'Oops. Something Wrong.' })
      } else {
        console.log("success in creating new playlist");
        res.status(200).json({ status: 'OK', data: body });
      }

    })
  }

  //Get Catalog Charts
  //Fetch one or more charts from the Apple Music Catalog.
  getCatalogCharts(req, res) {

    var options = {
      method: 'GET',
      url: url_getCatalogCharts + `?types=songs,albums,music-videos&genre=20&limit=20`,
      headers:
      {
        authorization: 'Bearer ' + api_configs.appleJWT
      }
    };

    request(options, function (error, response, body) {
      if (error) {
        res.status(400).json({
          success: false,
          data: error,
          message: 'Failed to retrieve catalog charts.'
        });
      };
      if (response) {
        body = body.replace('music-videos', 'music_videos');
        var result = JSON.parse(body);
        var return_data = {
          songs: [],
          albums: [],
          music_videos: [],
          playlists: [],
          music_src: 'apple'
        }
        result.results.songs[0].data.forEach(song => {
          let id = song.id;
          let name = song.attributes.name;
          let artistName = song.attributes.artistName;
          let artwork = song.attributes.artwork;
          let img_url = artwork.url;
          img_url = img_url.replace('{w}', artwork.width);
          img_url = img_url.replace('{h}', artwork.height);
          return_data.songs.push({ id, name, artistName, img_url });
        });
        result.results.music_videos[0].data.forEach(music_video => {
          let id = music_video.id;
          let name = music_video.attributes.name;
          let artistName = music_video.attributes.artistName;
          let artwork = music_video.attributes.artwork;
          let img_url = artwork.url;
          img_url = img_url.replace('{w}', artwork.width);
          img_url = img_url.replace('{h}', artwork.height);
          return_data.music_videos.push({ id, name, artistName, img_url });
        });
        result.results.albums[0].data.forEach(album => {
          let id = album.id;
          let name = album.attributes.name;
          let artistName = album.attributes.artistName;
          let artwork = album.attributes.artwork;
          let img_url = artwork.url;
          img_url = img_url.replace('{w}', artwork.width);
          img_url = img_url.replace('{h}', artwork.height);
          return_data.albums.push({ id, name, artistName, img_url });
        });
        res.status(200).send(return_data);
      }

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