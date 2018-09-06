var sharedData = {
    menu: 'store'
}
class StoreController {
    constructor() {}

    index(req, res) {
        res.render('pages/store', { sharedData : sharedData });
    }

}

module.exports = StoreController;