var FADE_TIME = 100;
var SCROLL_TIME = 200;
var HEADER_OFFSET = 150; //pixels

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

  //navigator functionality
  $("#links a").click(function() {
    var newpagename = this.href.split('#')[1];
    if(newpagename != pagename) {
      pagename = newpagename;
      $(".page").fadeOut(FADE_TIME);
      $("#page-" + pagename).delay(FADE_TIME).fadeIn(FADE_TIME);
      setTimeout(updateNavigator, FADE_TIME * 2);
    }
  })

  //add box titles
  $(".box").prepend(function() {
    return "<h3>" + $(this).attr("title") + "</h3><hr>";
  });

  //initialise navigator
  updateNavigator();


});


function updateNavigator() {
  //generate sub-navigator from visible boxes
  $("#sub-links").empty().append(function() {
    var html = "";
    $(".box:visible").each(function() {
      html += '<a>' + $(this).attr("title") + '</a>';
    });
    return html;
  });

  //add onclick events to links
  $("#sub-links a").click(function() {
    var element = $('.box[title="' + $(this).text() + '"]');
    $("html, body").animate({
      scrollTop: element.offset().top - HEADER_OFFSET
    }, SCROLL_TIME)
  });
}