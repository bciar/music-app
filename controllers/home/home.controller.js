const fetch = require('node-fetch');
const apiconfigs = require('../../api/configs');

var sharedData = {
    menu: 'home'
}

class HomeController {
    constructor() {
    }

    index(req, res) {
        res.render('pages/home', { sharedData: sharedData });
    }
    newMusic(req, res) {
        res.render('pages/parts/music/new-music', { sharedData: sharedData });
    }
    playlist(req, res) {
        res.render('pages/parts/music/playlist', { sharedData: sharedData });
    }
    playlistSave(req, res) {
        let music_id = req.body.music_id;
        let music_src = req.body.music_src;
        let music_type = req.body.music_type;
        let music_user_token = req.body.music_user_token;
        if (!music_id || !music_src) res.status(401).json({ status: 'error', message: 'parameter error.' });
        if (music_src == 'apple') {
            //save playlist to apple
            let url = apiconfigs.musickit_apiurl + `/putPlaylist`;
            fetch(
                url,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        music_id: music_id,
                        music_type: music_type,
                        music_user_token: music_user_token
                    }),
                    headers: { 'Content-Type': 'application/json' },
                }
            )
                .then((response) => {
                    console.log("------------------save request----------------");
                    // console.log(response.body);
                    res.status(200).json({ status: 'success', message: 'saved playlist successfully.' });
                })
                .catch((err) => {
                    // console.log(err);
                });
        }

    }
    charts(req, res) {
        let url = apiconfigs.musickit_apiurl + `/getCatalogCharts`;
        fetch(url)
            .then(res => res.text())
            .then(body => {
                let result = JSON.parse(body);
                res.render('pages/parts/music/charts', { sharedData: sharedData, resultData: result });
            })
            .catch(err => {
                res.status(200).json({ status: 'error', message: err });
            });

    }
    genres(req, res) {
        res.render('pages/parts/music/genres', { sharedData: sharedData });
    }
    videos(req, res) {
        res.render('pages/parts/music/videos', { sharedData: sharedData });
    }
}

module.exports = HomeController;