const REF_BOX_FADE_TIME = 200;

$(document).ready(function() {

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
    getReferenceById(this.id).addClass("selected");
  })

});

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

