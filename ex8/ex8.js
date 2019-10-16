$(document).ready(function() {
  var $btn = $("#btn"),
    $list = $("#list"),
    rsq1 = ASQ.react.of(),
    rsq2 = ASQ.react.of(),
    latest;

  $btn.click(function(evt) {
    rsq1.push(evt);
  });

  setInterval(function() {
    if (latest) {
      rsq2.push();
      latest = null;
    }
  }, 1000);

  rsq1.val(function(evt) {
    latest = evt;
  });

  rsq2.val(function(v) {
    console.log("Clicked!");
  });

  // TODO: setup sampled sequence, populate $list
});
