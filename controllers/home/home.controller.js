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

    getPlaylists(req, res) {
        let music_src = req.body.music_src;
        let music_user_token = req.body.music_user_token;

        if (!music_user_token || !music_src) res.status(401).json({ status: 'error', message: 'parameter error.' });

        if (music_src == 'apple') {
            let url = apiconfigs.musickit_apiurl + `/getPlaylists`;
            fetch(
                url,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        music_user_token: music_user_token
                    }),
                    headers: { 'Content-Type': 'application/json' },
                }
            )
                .then(res => res.text())
                .then(body => {
                    res.status(200).json({ status: 'success', data: body });
                })
                .catch((err) => {
                    res.status(404).json({ status: 'error', message: 'Internal server error.' });
                });
        }

        else {
            res.status(200).json({ status: 'success', message: 'saved playlist successfully.' });
        }
    }

    addMusicToPlaylist(req, res) {
        let music_id = req.body.music_id;
        let music_src = req.body.music_src;
        let music_type = req.body.music_type;
        let music_user_token = req.body.music_user_token;
        let music_mode = req.body.mode;
        let playlistName = req.body.playlistName;
        let playlistDescription = req.body.playlistDescription;
        let playlist_id = req.body.playlist_id;

        if (!music_id || !music_src || !music_type || !music_mode || !music_user_token) res.status(400).json({ status: 'error', message: 'parameter error.' });

        if (music_src == 'apple') {
            if (music_mode == 'create') {
                let url = apiconfigs.musickit_apiurl + `/createPlaylist`;
                fetch(
                    url,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            music_id: music_id,
                            music_type: music_type,
                            music_user_token: music_user_token,
                            playlistName: playlistName,
                            playlistDescription: playlistDescription
                        }),
                        headers: { 'Content-Type': 'application/json' },
                    }
                )
                    .then((response) => {
                        res.status(200).json({ status: 'success', message: 'saved playlist successfully.' });
                    })
                    .catch((err) => {
                        res.status(404).json({ status: 'error', message: 'Internal server error.' });
                    });
            }
            else {
                let url = apiconfigs.musickit_apiurl + `/addPlaylist`;
                fetch(
                    url,
                    {
                        method: 'POST',
                        body: JSON.stringify({
                            music_id: music_id,
                            music_type: music_type,
                            music_user_token: music_user_token,
                            playlist_id: playlist_id
                        }),
                        headers: { 'Content-Type': 'application/json' },
                    }
                )
                    .then((response) => {
                        res.status(200).json({ status: 'success', data: response });
                    })
                    .catch((err) => {
                        res.status(404).json({ status: 'error', message: 'Internal server error.' });
                    });
            }
        }
        else {
            res.status(200).json({ status: 'success', message: 'saved playlist successfully.' });
        }
    }

    getPlaylistById(req, res) {
        let id = req.params.id;
        let music_src = req.params.music_src;
        if(music_src == 'apple') {
            let url = apiconfigs.musickit_apiurl + `/`;
            fetch(url)
            .then(res => res.text())
            .then(body => {
                let result = JSON.parse(body);
                // res.render('pages/parts/music/charts', { sharedData: sharedData, resultData: result });
            })
            .catch(err => {
                res.status(200).json({ status: 'error', message: err });
            });
        } else {
            res.status(200).send("ok");
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