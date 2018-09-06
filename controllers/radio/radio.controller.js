var sharedData = {
    menu: 'radio'
}
class RadioController {
    constructor() {}

    index(req, res) {
        res.render('pages/radio', { sharedData : sharedData });
    }
    featured(req, res) {
        res.render('pages/parts/radio/featured', { sharedData : sharedData });
    }
    genres(req, res) {
        res.render('pages/parts/radio/genres', { sharedData : sharedData });
    }

}

module.exports = RadioController;