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

async function asyncCall() {
  var process = await Promise.all([
    getFile("file1"),
    getFile("file2"),
    getFile("file3")
  ]).then(t => {
    console.log(t[0]);
    console.log(t[1]);
    console.log(t[2]);
  });
  console.log("Complete!");
}

asyncCall();
