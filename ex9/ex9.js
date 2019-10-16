$(document).ready(function() {
  var $btn = $("#btn"),
    $list = $("#list"),
    clicks = ASQ.csp.chan(),
    msgs = ASQ.csp.chan(),
    queueClick;

  $btn.click(listenToClicks);

  function listenToClicks(evt) {
    if (!queueClick) {
      queueClick = ASQ.csp.putAsync(clicks, evt);
      queueClick.then(function() {
        queueClick = null;
      });
    }
  }
  ASQ().runner(ASQ.csp.go(singleClicks), ASQ.csp.go(logClicks));

  function* singleClicks() {
    while (true) {
      yield ASQ.csp.take(ASQ.csp.timeout(1000));
      yield ASQ.csp.take(clicks);
      yield ASQ.csp.put(msgs, "Clicked!");
    }
  }

  function* logClicks() {
    while (true) {
      var msg = yield ASQ.csp.take(msgs);
      $list.append($("<div>" + msg + "</div>"));
    }
  }

  // TODO: setup sampling go-routine and
  // channel, populate $list
});
