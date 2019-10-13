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

var p1 = getFile("file1");
var p2 = getFile("file2");
var p3 = getFile("file3");

p1.val(output)
  .seq(p2)
  .val(output)
  .seq(p3)
  .val(output)
  .val(function() {
    output("Complete");
  });

// request an array of files at once in "parallel"
// ???
