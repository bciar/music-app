document.addEventListener('musickitloaded', function() { 
  "use strict";
  var music = MusicKit.getInstance();

  $(document).on("click", ".play-music", function(e) {
    let music_type = $(e.target).attr('data-music-type');
    let music_id = $(e.target).attr('data-music-id');
    music.setQueue({song: music_id}).then(function() {
      music.player.play();
    });
  });
  
  $("#loginwithApple").click(function() {
    music.authorize().then(function(token) {
      $.ajax({
        url: '/loginWithApple',
        method: 'POST',
        data: {token: token},
        success: function(res) {
          location.href = '/home';
        }
      })
      
    });
  });
});