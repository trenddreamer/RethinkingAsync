$(document).ready(function() {
  var $btn = $("#btn"),
    $list = $("#list");

  $btn.click(function(evt) {
    process1(evt);
  }),
    ASQ().runner(
      ASQ.csp.go(function* process1(ch) {
        yield ASQ.csp.put(ch, "Click");
      }),
      ASQ.csp.go(function* process2(ch) {
        yield ASQ.csp.take(ch);
        console.log("Clicked!");
      })
    );

  // TODO: setup sampling go-routine and
  // channel, populate $list
});
