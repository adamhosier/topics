var FADE_TIME = 100;

$(document).ready(function(){

  var url = document.URL.split('#');
  var pagename;
  if(url.length < 2) {
    history.pushState({}, "Introduction", "#introduction");
    pagename = "introduction";
  } else {
    pagename = url[1];
  }

  //only show the current page
  $(".page").hide();
  $("#page-" + pagename).show();

  $("#links a").click(function() {
    var newpagename = this.href.split('#')[1];
    if(newpagename != pagename) {
      pagename = newpagename;
      $(".page").fadeOut(FADE_TIME);
      $("#page-" + pagename).delay(FADE_TIME).fadeIn(FADE_TIME);
    }
  })

});
