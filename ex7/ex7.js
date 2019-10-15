var ASQ = require("asynquence");
require("asynquence-contrib");

function fakeAjax(url, cb) {
  var fake_responses = {
    file1: "The first text",
    file2: "The middle text",
    file3: "The last text"
  };
  var randomDelay = (Math.round(Math.random() * 1e4) % 8000) + 1000;

  console.log("Requesting: " + url);

  setTimeout(function() {
    cb(fake_responses[url]);
  }, randomDelay);
}

function output(text) {
  console.log(text);
}

// **************************************

function getFile(file) {
  return new Promise(function(done) {
    fakeAjax(file, done);
  });
}

function* Gen() {
  var p1 = getFile("file1");
  var p2 = getFile("file2");
  var p3 = getFile("file3");

  output(yield p1);
  output(yield p2);
  output(yield p3);

  output("Complete!");
}

function runner(genFn) {
  const itr = genFn();

  function run(arg) {
    const result = itr.next(arg);
    if (result.done) {
      return result.value;
    } else {
      return Promise.resolve(result.value).then(run);
    }
  }

  run();
}

runner(Gen);

/* ASQ().runner(function*() {
  var p1 = getFile("file1");
  var p2 = getFile("file2");
  var p3 = getFile("file3");

  var text1 = yield p1;
  output(text1);
  var text2 = yield p2;
  output(text2);
  var text3 = yield p3;
  output(text3);

  output("Complete!");
}); */
