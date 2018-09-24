const fetch = require('node-fetch');
const apiconfigs = require('../api/configs');
var sharedData = {
    menu: 'store'
}
class MainController {

    constructor() {}

    landing(req, res) {
        res.render('pages/landing', { sharedData : sharedData});
        let url = apiconfigs.musickit_apiurl + `/getCatalogCharts`;
        // fetch(url)
        //     .then(res => res.text())
        //     .then(body => {
        //        let result = JSON.parse(body);
        //        res.render('pages/landing', { sharedData : sharedData, resultData: result });
        //     })
        //     .catch(err => {
        //         res.status(200).json({status: 'error', message: err});
        //     });
    }

    recent(req, res) {
        sharedData.menu = 'recently-played';
        res.render('pages/recently-played', { sharedData : sharedData });
    }

    songs(req, res) {
        sharedData.menu = 'songs';
        res.render('pages/songs', { sharedData : sharedData });
    }

    albums(req, res) {
        sharedData.menu = 'albums';
        res.render('pages/albums', { sharedData : sharedData });
    }

    artists(req, res) {
        sharedData.menu = 'artists';
        res.render('pages/artists', { sharedData : sharedData });
    }

    purchased(req, res) {
        sharedData.menu = 'purchased';
        res.render('pages/purchased', { sharedData : sharedData });
    }

    myLike(req, res) {
        sharedData.menu = 'my-like';
        res.render('pages/my-like', { sharedData : sharedData });
    }

    singleArtist(req, res) {
        sharedData.menu = 'single-artist';
        res.render('pages/single-artist', { sharedData : sharedData });
    }

    singlePlaylist(req, res) {
        sharedData.menu = 'single-playlist';
        res.render('pages/single-playlist', { sharedData : sharedData });
    }

}

module.exports = MainController;