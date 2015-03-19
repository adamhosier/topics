var FADE_TIME = 100;
var SCROLL_TIME = 100;
var HEADER_OFFSET = 150; //pixels
const REF_BOX_FADE_TIME = 200;

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
      window.scrollBy(0,-10000);
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

  //Manage reference text, click & hover events
  $("sup").each(function() {
    $(this).html('<a>[' + this.id[1] + ']</a>');
  }).hover(function(e){
    $("body").append(makeReferenceBox(this.id, e.pageX, e.pageY));
    $(".ref-box").fadeIn(REF_BOX_FADE_TIME);
  }, function(){
    $(".ref-box").fadeOut(REF_BOX_FADE_TIME, function () {
      $(this).remove();
    });
  }).click(function(){
    $("li").removeClass("selected");
    var element = getReferenceById(this.id)
    element.addClass("selected")
    $("html, body").animate({
      scrollTop: element.offset().top - HEADER_OFFSET
    }, SCROLL_TIME)
  })

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

function getReferenceById(id) {
  return $("ol li:nth-of-type(" + id[1] + "):visible");
}

function makeReferenceBox(id, x, y) {
  return $("<div></div>", {
    "class": "ref-box",
    style: "left:" + (x + 5) + "px; top:" + (y + 5) + "px",
    html: "<h4>Reference ID: " + id[1] + " (click for more)</h4><hr>" + getReferenceById(id).text()
  });
}

