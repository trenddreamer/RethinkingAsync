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
  return new Promise(function(resolve) {
    fakeAjax(file, resolve);
  });
}

var p1 = getFile("file1");
var p2 = getFile("file2");
var p3 = getFile("file3");

p1.then(prm1 => output(prm1))
  .then(() => p2)
  .then(function(prm2) {
    Bar();
    output(prm2);
  })
  .catch(function(err) {
    output(err.message);
  })
  .then(() => p3)
  .then(prm3 => output(prm3))
  .then(() => output("Complete"))
  .catch(function(err) {
    output(err.message);
  });
