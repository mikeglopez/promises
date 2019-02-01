/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var promisification = require('./promisification.js');
var Promise = require('bluebird');
var GitHubApi = require('github-api');

var github = new GitHubApi({
  version: '3.0.0'
});

var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(readFilePath, 'utf8', (err, line) => {
      if (err) {
        reject(err);
      } else {
        // console.log("line *****: ", line);
        var username = line.split('\n')[0];
        resolve(username);
      }
    });
  })
    .then((username) => {
      var profile = promisification.getGitHubProfileAsync(username, (err, data)=>{
        // console.log("Data ****:", data);
      });
      // console.log("Profile ****:", profile);
    // console.log("This is profile stringified: ****", profile);
    // return new Promise((resolve, reject) => {
    //   fs.writeFile(writeFilePath, JSON.stringify(profile), (err) => {
    //     console.log("writeFilePath ******: ", writeFilePath);
    //     if (err) {
    //       reject(err);
    //     } else {
    //       console.log('test');
    //     }
    //   })
    // })
    })
    .catch((err) => {
      console.log('error getting profile', err);
    });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
