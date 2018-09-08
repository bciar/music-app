const fetch = require('node-fetch');
const apiconfigs = require('../../api/configs');

var sharedData = {
    menu: 'home'
}

class HomeController {
    constructor() {
    }
    
    index(req, res) {
        res.render('pages/home', { sharedData : sharedData });
    }
    newMusic(req, res) {
        res.render('pages/parts/music/new-music', { sharedData : sharedData });
    }
    playlist(req, res) {
        res.render('pages/parts/music/playlist', { sharedData : sharedData });
    }
    charts(req, res) {
        let url = apiconfigs.musickit_apiurl + `/getCatalogCharts`;
        fetch(url)
            .then(res => res.text())
            .then(body => {
                let result = JSON.parse(body);
                res.render('pages/parts/music/charts', { sharedData : sharedData, resultData: result });
            })
            .catch(err => {
                res.status(200).json({status: 'error', message: err});
            });
        
    }
    genres(req, res) {
        res.render('pages/parts/music/genres', { sharedData : sharedData });
    }
    videos(req, res) {
        res.render('pages/parts/music/videos', { sharedData : sharedData });
    }
}

module.exports = HomeController;