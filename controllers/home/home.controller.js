
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
        res.render('pages/parts/music/charts', { sharedData : sharedData });
    }
    genres(req, res) {
        res.render('pages/parts/music/genres', { sharedData : sharedData });
    }
    videos(req, res) {
        res.render('pages/parts/music/videos', { sharedData : sharedData });
    }
}

module.exports = HomeController;