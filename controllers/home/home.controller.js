
class HomeController {
    constructor() {}

    index(req, res) {
        res.render('pages/home', {});
    }
    newMusic(req, res) {
        res.render('pages/parts/music/new-music');
    }
    playlist(req, res) {
        res.render('pages/parts/music/playlist');
    }
    charts(req, res) {
        res.render('pages/parts/music/charts');
    }
    genres(req, res) {
        res.render('pages/parts/music/genres');
    }
    videos(req, res) {
        res.render('pages/parts/music/videos');
    }
}

module.exports = HomeController;