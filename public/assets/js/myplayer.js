var applemusic;
var adonisPlayer = {},
  adonisAllPlaylists = [],
  adonisPlayerID = 'adonis_jplayer_main',
  adonisPlayerContainer = 'adonis_jp_container',
  adonisPlaylist,
  currentPlayMusic;
currentPlayingMusicIndex = 0;
currentPlayTime = 0;
var isPlaying = false;
var playingMode = '';

document.addEventListener('musickitloaded', function () {
  applemusic = MusicKit.getInstance();
});

var getAppleMusicdetail = async function (music_id) {
  return await applemusic.api.song(music_id).then((res) => {
    let artwork = res.attributes.artwork;
    let img_url = artwork.url;
    img_url = img_url.replace('{w}', artwork.width);
    img_url = img_url.replace('{h}', artwork.height);

    let song = {
      src: 'apple',
      data: {
        id: music_id,
        type: 'song',
        name: res.attributes.name,
        artistName: res.attributes.artistName,
        url: res.attributes.url,
        duration: res.attributes.durationInMillis / 1000,
        img: img_url
      }
    };
    return song;
  });
}

$(document).on("click", ".play-music", function (e) {
  let target = $(e.target);
  let item = target.parents('.music-img-box');
  let music_type = item.attr('data-music-type');
  let music_id = item.attr('data-music-id');
  let music_src = item.attr('data-music-src');
  let music_list_index = item.attr('data-playlist-index');
  if (music_list_index != null) {
    currentPlayingMusicIndex = music_list_index;
    adonisPlayer.play();
  }
  if (music_src == 'apple' && music_type == 'song') {
    //get music Infomation from apple api
    getAppleMusicdetail(music_id).then((song) => {
      adonisAllPlaylists.unshift(song);
      adonisPlayer.updatePlaylists();
      adonisPlayer.play();
    })
  }
});

$(document).on("click", ".jp-play", function (e) {
  if (adonisAllPlaylists.length == 0) return;
  if (isPlaying == true) {
    adonisPlayer.pause();
  } else {
    adonisPlayer.continue();
  }

});

$(document).on("click", ".jp-previous", function (e) {
  if (currentPlayingMusicIndex == 0) currentPlayingMusicIndex = adonisAllPlaylists.length - 1;
  else currentPlayingMusicIndex--;
  adonisPlayer.play();
});

$(document).on("click", ".jp-next", function (e) {
  if (currentPlayingMusicIndex == adonisAllPlaylists.length - 1) currentPlayingMusicIndex = 0;
  else currentPlayingMusicIndex++;
  adonisPlayer.play();
});
$(document).on("click", ".jp-shuffle", function (e) {
  playingMode = 'shuffle';
  $(".jp-shuffle").addClass("jp-playmode");
  $(".jp-repeat").removeClass("jp-playmode");
});
$(document).on("click", ".jp-repeat", function (e) {
  playingMode = 'repeat';
  $(".jp-shuffle").removeClass("jp-playmode");
  $(".jp-repeat").addClass("jp-playmode");
});
jQuery(document).ready(function ($) {
  "use strict";

  adonisPlayer.init = function () {

  }

  adonisPlayer.play = function () {
    if (adonisAllPlaylists.length == 0) return;
    currentPlayMusic = adonisAllPlaylists[currentPlayingMusicIndex];
    //update playlist
    adonisPlayer.updatePlaylists();

    if (currentPlayMusic.src == 'apple' && currentPlayMusic.data.type == 'song') {

      var poster = currentPlayMusic.data.img;
      $('#' + adonisPlayerContainer).find('.adonis-player .song-poster img').attr('src', poster);
      // blurred background
      $('#' + adonisPlayerContainer).find('.blurred-bg').css('background-image', 'url(' + poster + ')');
      // astist
      $('#' + adonisPlayerContainer + ' .artist-name').html(currentPlayMusic.data.artistName);
      //name
      $('.current-item .jp-title').html(currentPlayMusic.data.name);
      currentPlayTime = 0;
      isPlaying = true;
      $(".jp-seek-bar").attr('style', 'width: 100%;');
      $("#adonis_jp_container").addClass(" jp-state-playing");
      if (applemusic.player.isPlaying) { applemusic.player.stop(); }
      applemusic.setQueue({ song: currentPlayMusic.data.id }).then(function () {
        applemusic.player.play();
        showingTimeAndProgress();
      });
      let duration = convertToMins(currentPlayMusic.data.duration);
      $(".jp-duration").html(duration);

    }

  }
  //contine
  adonisPlayer.continue = function () {
    if (currentPlayMusic.src == 'apple') {
      applemusic.player.play();
    }
    isPlaying = true;
    $("#adonis_jp_container").addClass(" jp-state-playing");
  }
  //pause
  adonisPlayer.pause = function () {
    if (currentPlayMusic.src == 'apple') {
      applemusic.player.pause();
    }
    isPlaying = false;
    $("#adonis_jp_container").removeClass("jp-state-playing");
  }

  adonisPlayer.playNext = function () {
    if (playingMode == 'shuffle') {
      let index = Math.floor(Math.random() * adonisAllPlaylists.length);
      if (index == currentPlayingMusicIndex)
        index = Math.floor(Math.random() * adonisAllPlaylists.length);
      currentPlayingMusicIndex = index;
      adonisPlayer.play();
    } else if (playingMode == 'repeat') {
      currentPlayingMusicIndex++;
      if (currentPlayingMusicIndex == adonisAllPlaylists.length) { currentPlayingMusicIndex = 0; }
      adonisPlayer.play();
    } else {
      if (currentPlayingMusicIndex == adonisAllPlaylists.length - 1) { applemusic.player.stop(); }
      else {
        currentPlayingMusicIndex++;
        adonisPlayer.play();
      }

    }


  }

  // update playLists
  adonisPlayer.updatePlaylists = function () {
    // $(".jp-playlist")playlist_menu
    var lists = "";
    let index = 0;
    adonisAllPlaylists.forEach(music => {
      let playcss = '', playanimationcss = '';
      if (currentPlayingMusicIndex == index) { playcss = ' jp-playlist-current'; playanimationcss = ' playing'; }
      var list_item = '<li class="item clearfix' + playcss + '"><div class="playlist-item"><div class="img-box music-img-box song-poster" data-playlist-index="' + index + '"><img src="' + music.data.img + '" alt=""><div class="hover-state"><span class="play-btn-dark play-music"><i class="play-icon play-music-list"></i></span></div></div><div class="meta"><span class="now playlist-animate' + playanimationcss + '"><span class="bar n1">A</span><span class="bar n2">B</span><span class="bar n3">c</span></span><div class="hover-state"><div class="d-flex justify-content-end align-items-center"><a href="#" class="mr-2"><span class="adonis-icon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18"height="15" viewBox="0 0 37 32"><path d="M27.379 0c-3.478 0.417-6.509 2.067-8.695 4.492l-0.011 0.012c-2.204-2.428-5.231-4.075-8.638-4.498l-0.068-0.007c-6.232 0-9.966 3.641-9.966 9.756 0.377 3.717 2.096 6.973 4.658 9.327l0.011 0.010 13.001 12.534c0.225 0.231 0.539 0.374 0.886 0.374 0.009 0 0.017-0 0.026-0l-0.001 0c0.004 0 0.010 0 0.015 0 0.35 0 0.667-0.143 0.895-0.373l0-0 13.187-12.511c0-0.187 4.668-4.365 4.668-9.36 0-6.115-3.734-9.756-9.966-9.756zM30.763 17.179l-12.090 11.647-12.114-11.67c-2.066-1.882-3.481-4.446-3.89-7.334l-0.008-0.065c0-5.859 3.968-7.002 7.306-7.002s6.605 3.361 7.679 4.668c0.253 0.283 0.619 0.46 1.027 0.46s0.774-0.177 1.026-0.458l0.001-0.001c1.074-1.284 4.668-4.668 7.679-4.668s7.282 1.237 7.282 7.002c0 3.805-3.851 7.352-3.898 7.422z"></path></svg></span></a><a class="track-menu-playlist" href="#"><i class="icon-dot-nav-horizontal"></i></a></div></div> <span class="jp-time">' + convertToMins(music.data.duration) + '</span></div><a href="javascript:;" class="jp-playlist-item">' + music.data.name + '</a><p class="jp-artist"><a href="#link1">' + music.data.artistName + '</a></p></div></li>';
      lists += list_item;
      index++;
    });
    $("#playlist_menu").html(lists);
  }

  function convertToMins(secs) {
    let mins = Math.floor(secs / 60);
    let sec = Math.floor(secs - mins * 60);
    if (mins < 10) mins = '0' + mins;
    if (sec < 10) sec = '0' + sec;
    let time_string = mins + ':' + sec;
    return time_string;
  }

  function showingTimeAndProgress() {
    currentPlayTime = applemusic.player.currentPlaybackTime;
    $(".jp-current-time").html(convertToMins(currentPlayTime));
    var maxtime = currentPlayMusic.data.duration;
    var percentage = currentPlayTime / maxtime * 100;
    updatebar(percentage);
    if (currentPlayTime >= maxtime - 1) {
      adonisPlayer.playNext();
      console.log("next");
    }
    if (isPlaying && currentPlayTime < maxtime - 1) {
      setTimeout(showingTimeAndProgress, 1000);
    }
    
  }

  var timeDrag = false; /* Drag status */

  $('.jp-progress').mousedown(function (e) {
    timeDrag = true;
    var percentage = updatePercentage(e.pageX, $(this));
    $(this).addClass('dragActive');

    updatebar(percentage);
  });

  $(document).mouseup(function (e) {
    if (timeDrag) {
      timeDrag = false;
      var percentage = updatePercentage(e.pageX, $('.jp-progress.dragActive'));
      $('.jp-progress.dragActive');
      if (percentage) {
        $('.jp-progress.dragActive').removeClass('dragActive');
        updatebar(percentage);
        updateMusic(percentage);
      }
    }
  });

  $(document).mousemove(function (e) {
    if (timeDrag) {
      var percentage = updatePercentage(e.pageX, $('.jp-progress.dragActive'));
      updatebar(percentage);
    }
  });
  function updateMusic(percentage) {
    //update music time line
    if (currentPlayMusic.src == 'apple') {
      //call apple
      var maxtime = currentPlayMusic.data.duration;
      var newTime = Math.floor(maxtime * percentage / 100);
      applemusic.player.seekToTime(newTime);
    }
  }

  //update Progress Bar control
  function updatebar(percentage) {
    $('.jp-play-bar').css('width', percentage + '%');
  };

  function updatePercentage(x, progressBar) {
    var progress = progressBar;
    var maxduration = currentPlayMusic.data.duration; //audio duration
    var position = x - progress.offset().left; //Click pos
    var percentage = 100 * position / progress.width();
    //Check within range
    if (percentage > 100) {
      percentage = 100;
    }
    if (percentage < 0) {
      percentage = 0;
    }
    return percentage;
  }

  var volumeDrag = false;
  $(document).on('mousedown', '.jp-volume-bar', function (e) {
    volumeDrag = true;
    updateVolume(e.pageX);
  });

  $(document).mouseup(function (e) {
    if (volumeDrag) {
      volumeDrag = false;
      updateVolume(e.pageX);
    }
  });

  $(document).mousemove(function (e) {
    if (volumeDrag) {
      updateVolume(e.pageX);
    }
  });

  //update Progress Bar control
  var updateVolume = function (x) {
    var progress = $('.jp-volume-bar');
    var position = x - progress.offset().left; //Click pos
    var percentage = 100 * position / progress.width();

    //Check within range
    if (percentage > 100) {
      percentage = 100;
    }
    if (percentage < 0) {
      percentage = 0;
    }
    setVolumn(percentage);

    var muteControl = $('.adonis-mute-control');
    muteControl.attr('data-volume', percentage / 100);
    if (muteControl.hasClass('muted')) {
      muteControl.removeClass('muted');
      $('#adonis_jp_container').removeClass('jp-state-muted');
    }
  };

  var setVolumn = function (v) { //percentage

    $(".jp-volume-bar-value").attr('style', 'width:' + v + '%;');
    //set audio volume

    if (document.querySelector("audio") != null)
      document.querySelector("audio").volume = v / 100;
  };

  $('.adonis-mute-control').click(function () {
    var muteControl = $(this);

    if (muteControl.hasClass('muted')) {
      var volume = muteControl.attr('data-volume');
      muteControl.removeClass('muted');
      $('#adonis_jp_container').removeClass('jp-state-muted');
      setVolumn(volume * 100);
    } else {
      muteControl.addClass('muted');
      $('#adonis_jp_container').addClass('jp-state-muted');
      setVolumn(0);
    }
  });




  $(window).imagesLoaded(function () {
    setTimeout(function () {
      adonisPlayer.init();
    }, 100);
  });
  // ------------------------------------------------Login---------------------------------------------------------------
  $("#loginwithApple").click(function () {
    applemusic.authorize().then(function (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('user_type', 'apple');
      $("#token").val(token);
      $("#loginForm").submit();
    });
  });

  // ----------------------------------------------------------------------------------------------------------------------

  // control menu items
  $(document).on("click", ".dropdown-item", function (e) {
    let target = $(e.target);
    let item = clickedItemforDropMenu;
    let music_type = item.attr('data-music-type');
    let music_id = item.attr('data-music-id');
    let music_src = item.attr('data-music-src');
    let token = localStorage.getItem('token');

    if (target.html() == 'Add to Next Up') {
      if (music_src == 'apple' && music_type == 'song') {
        //get music Infomation from apple api
        getAppleMusicdetail(music_id).then((song) => {
          adonisAllPlaylists.push(song);
          adonisPlayer.updatePlaylists();
        })
      }
    }
    else if (target.html() == 'Add to Playlist') {
      let url = '/home/music/playlist/getlists';
      //get all playlists
      $.ajax({
        url: url,
        method: 'POST',
        crossDomain: true,
        data: {
          music_user_token: token,
          music_src: music_src
        },
        success: function (res) {
          let data = res.data;
          let options = '';
          data = JSON.parse(data);
          if (data.length > 0) {
            data.forEach(playlist => {
              let id = playlist.id;
              let name = playlist.name;
              let description = playlist.description;
              let item = '<option value="' + id + '">' + name + ' (' + description + ' )</option>';
              options = options + item;
            });
          }
          options = options + '<option value="">Create New Playlist</option>';
          $("#playlist_modal_music_id").val(music_id);
          $("#playlist_modal_music_src").val(music_src);
          $("#playlist_modal_music_type").val(music_type);
          $("#playlist_modal_token").val(token);
          $("#playlist_ids_select").html(options);
        }
      });

      $("#addtoPlaylistModal").modal();
    }
  });

  // ------------------------ playlist ------------------------------
  $("#playlist_ids_select").change(function () {
    let value = $("#playlist_ids_select").val();
    if (value == '') {
      $("#create_new_playlist_form").attr("style", "display: block;");
      $("#playlist_modal_mode").val('create');
    } else {
      $("#create_new_playlist_form").attr("style", "display: none;");
      $("#playlist_modal_mode").val('add');
    }
  })

  $("#addPlaylistSubmit").click(function () {
    let music_id = $("#playlist_modal_music_id").val();
    let music_src = $("#playlist_modal_music_src").val();
    let music_type = $("#playlist_modal_music_type").val();
    let music_user_token = $("#playlist_modal_token").val();
    let mode = $("#playlist_modal_mode").val();
    let playlist_id = $("#playlist_ids_select").val();
    let playlistName = $("#playlistName").val();
    let playlistDescription = $("#playlistDescription").val();
    if (mode == 'create' && (!playlistName || !playlistDescription)) return;
    $.ajax({
      url: '/home/music/playlist/addmusic',
      method: 'POST',
      crossDomain: true,
      data: {
        music_id, music_src, music_type, music_user_token, mode, playlist_id, playlistName, playlistDescription
      },
      success: function (res) {
        $("#addtoPlaylistModal").modal('toggle');
      }
    })
  })


});