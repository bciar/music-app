jQuery(document).ready(function($){
  "use strict";
  $(document).on("click", ".href-load", function(e) {
    var _url = typeof $(e.target).attr('href') !== 'undefined' ?  $(e.target).attr('href') : null ;
    if(_url) window.location.href = _url;
  });
});