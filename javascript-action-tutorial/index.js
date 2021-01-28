const core = require('@actions/core');
const github = require('@actions/github');

try {
  console.log('Testing if this action occurs due to an issue comment')
  const context = JSON.stringify(github.context, undefined, 2)
  console.log(`The entire github context: ${context}`);
  console.log(`Now on to the fun stuff!`);
  var is_pr_comment = false;
  var pr_number = null;
  if (github.context.event_name == "issue_comment" && github.context.event.issue.pull_request ) {
    is_pr_comment = true;
    console.log(`The pr url is: ${github.context.event.issue.pull_request.html_url}`)
    const start_index = github.context.event.issue.pull_request.html_url.lastIndexOf('/') + 1
    pr_number = github.context.event.issue.pull_request.html_url.substring(start_index)
    console.log(`The pr number is: ${pr_number}`)
  } else {
    console.log(`missed the if statement`)
  }
  // // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);
  // // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
  // console.log(`The event_name: ${github.context.event_name}`)
  // // think this could be empty too
  // console.log(`The PR url: ${github.context.event.issue.pull_request.html_url}`)
} catch (error) {
  core.setFailed(error.message);
}
