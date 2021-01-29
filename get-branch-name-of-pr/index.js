// Tests whether a comment is on a PR and if it is, returns the PR number and some metadata about the comment author relative to the PR

const core = require('@actions/core');
const github = require('@actions/github');

async function fetchName(owner, repository, pr_number) {
        try {
          const github_url='https://api.github.com/repos'
          const url=`${github_url}/${owner}/${repository}/pulls/${pr_number}`
          const response = await fetch(url, {
                method: 'GET',
            });
          const pr_data = await response.json();
          return pr_data.head.ref;
        } catch (error) {
            console.error(error);
        }
    }

async function main() {
  try {
    const owner = core.getInput('owner')
    const repository = core.getInput('repository')
    const pr_number = core.getInput('pr_number')
    console.log(`Getting branch name of PR ${owner}/${repository}/${pr_number}`)

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

