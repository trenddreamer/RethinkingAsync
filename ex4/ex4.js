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
// The old-n-busted callback way

function getFile(file) {
  return new Promise(function(resolve) {
    fakeAjax(file, resolve);
  });
}

var files = ["file1", "file2", "file3"];

var process = files.map(t => getFile(t));

process
  .reduce((chain, pr) => {
    return chain.then(() => pr).then(output);
  }, Promise.resolve())
  .then(function() {
    output("Complete.");
  });

var x = [1, 2, 3, 4];

console.log(x.reduce((acc, curr) => acc + curr, 5));
// Request all files at once in
// "parallel" via `getFile(..)`.
//
// Render as each one finishes,
// but only once previous rendering
// is done.

// ???
