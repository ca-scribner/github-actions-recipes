// Tests whether a comment is on a PR and if it is, returns the PR number and some metadata about the comment author relative to the PR

const core = require('@actions/core');
const github = require('@actions/github');

try {
  var event_ref = null

  if (github.context.eventName == "issue_comment" && github.context.payload.issue.hasOwnProperty("pull_request") ) {
    const issue = github.context.payload.issue
    console.log(`The PR url is: ${issue.pull_request.html_url}`)
    const start_index = issue.pull_request.html_url.lastIndexOf('/') + 1
    pr_number = issue.pull_request.html_url.substring(start_index)
    console.log(`The PR number is: ${pr_number}`)

    // Extract an event_ref string for this PR
    event_ref = `+refs/pull/${pr_number}/merge`

  } else {
    event_ref = github.context.ref
  }
  core.setOutput("event_ref", event_ref)
} catch (error) {
  core.setFailed(error.message);
}
