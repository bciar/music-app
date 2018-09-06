
class MainController {
    constructor() {}

    recent(req, res) {
        res.render('pages/recent-played', {});
    }
    songs(req, res) {
        res.render('pages/songs', {});
    }

}

module.exports = MainController;