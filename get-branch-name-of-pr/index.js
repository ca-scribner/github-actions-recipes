// Tests whether a comment is on a PR and if it is, returns the PR number and some metadata about the comment author relative to the PR

const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require("node-fetch");

async function fetchName(owner, repository, pr_number) {
        try {
          if (owner === "" || repository === "" || pr_number === "") {
            console.log("UHHO.  An input is blank")
            throw new Error('invalid inputs - is an input missing?');
          }
          const github_url='https://api.github.com/repos'
          const url=`${github_url}/${owner}/${repository}/pulls/${pr_number}`
          const response = await fetch(url, {
                method: 'GET',
            });
          const pr_data = await response.json();
          console.log(`pr_data = ${pr_data}`)
          return pr_data.head.ref;
        } catch (error) {
            throw(error);
        }
    }

async function main() {
  try {
    const owner = core.getInput('owner')
    const repository = core.getInput('repository')
    const pr_number = core.getInput('pr_number')
    console.log(`Getting branch name of PR owner=${owner}, repository=${repository}, pr_number=${pr_number}`)

    const branch_name = await fetchName(owner, repository, pr_number)
    console.log(`Got branch name: ${branch_name}`)
  } catch (error) {
    core.setFailed(error.message);
  }

}

main()

//   const Http = new XMLHttpRequest()
//   const github_url='https://api.github.com/repos'
//   const url=`${github_url}/${owner}/${repository}/pulls/${pr_number}`

//   fetch(url)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (myJson) {
//       console.log(myJson.head);
//     })
//     .catch(function (error) {
//       console.log("Error: " + error);
//     });

//   Http.open("GET", url)
//   Http.send()

