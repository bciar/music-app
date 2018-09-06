
class RadioController {
    constructor() {}

    index(req, res) {
        res.render('pages/radio', {});
    }
    featured(req, res) {
        res.render('pages/parts/radio/featured', {});
    }
    genres(req, res) {
        res.render('pages/parts/radio/genres', {});
    }

}

module.exports = RadioController;