/**
 *
 * This is the code to automate a repository for
 *
 *
 *
 **/

const axios = require('axios')
const fs = require('fs-extra')
const path = require('path')
const directoryPath = path.join(__dirname)

const searchPattern = new RegExp(/^example-/);

let existingRepos = fs.readdirSync(directoryPath, { withFileTypes: true })
  .filter((item) => item.isDirectory() && item.name.match(searchPattern) != null)
  .map((item) => item.name);

console.log(existingRepos)

axios.get("https://api.github.com/users/mikezyeman/repos")
  .then((res) => {
    let data = res.data;
    let repos = data.filter(r => r.name.match(searchPattern) != null);

    repos.forEach((repo) => {

      console.log(repo);
    })
  })
  .catch(err => console.error(err))
