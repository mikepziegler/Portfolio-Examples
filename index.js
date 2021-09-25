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
const { exec } = require("child_process")

const prefixReponame = 'mikezyeman/';
const repoSearchPattern = new RegExp(/^example-/);
const descSearchPattern = "Not finished";
const gitUrl = "https://github.com/mikezyeman/";
const gitExtension = ".git";

let existingRepos = fs.readdirSync(directoryPath, { withFileTypes: true })
    .filter((item) => item.isDirectory() && item.name.match(repoSearchPattern) != null)
    .map((item) => item.name);


function executeGit(message) {
    exec(`git add --all`, (error, stdout, stderr) => {
        if (error) console.error(`error: ${error.message}`)
        if (stderr) console.error(`stderr: ${stderr}`)

        exec(`git commit -m "${message}"`, (error, stdout, stderr) => {
            if (error) console.error(`error: ${error.message}`)
            if (stderr) console.error(`stderr: ${stderr}`)

            exec(`git push`, (error, stdout, stderr) => {
                if (error) console.error(`error: ${error.message}`)
                if (stderr) console.error(`stderr: ${stderr}`)

            })
        })
    })
}

axios.get("https://api.github.com/users/mikezyeman/repos")
    .then((res) => {
        let data = res.data;

        let repos = data
            .filter(r => r.name.match(repoSearchPattern) != null && r.description !== descSearchPattern)
            .map(r => r.name);

        let reposToAdd = repos.filter(x => !existingRepos.includes(x));
        reposToAdd.forEach((repo) => {

            exec(`git submodule add ${gitUrl}${repo}.git`, (error, stdout, stderr) => {
                if (error) console.error(`error: ${error.message}`)
                if (stderr) console.error(`stderr: ${stderr}`)

                executeGit(`Automation: Added ${repo} as submodule`);
            })
        });

        let reposToRemove = existingRepos.filter(x => !repos.includes(x));
        reposToRemove.forEach((repo) => {
            exec("rmdir " + repo, (error, stdout, stderr) => {
                if (error) console.error(`error: ${error.message}`)
                if (stderr) console.error(`stderr: ${stderr}`)

                console.log(`stdout: ${stdout}`);
            })

        });

  })
  .catch(err => console.error(err))
