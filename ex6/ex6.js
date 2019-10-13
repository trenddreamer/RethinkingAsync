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
  return ASQ(function(done) {
    fakeAjax(file, done);
  });
}

var files = ["file1", "file2", "file3"];

var process = files.map(t => getFile(t));
ASQ()
  .seq(...process.map(t => () => t.val(output)))
  .val(function() {
    output("Complete!");
  });

// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

// ???
