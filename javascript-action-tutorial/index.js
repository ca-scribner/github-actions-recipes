const core = require('@actions/core');
const github = require('@actions/github');

try {
  console.log('Testing if this action occurs due to an issue comment')
  const allowed_author_associations = JSON.core.getInput('allowed_author_associations')

  var is_pr_comment = false;
  var pr_number = null;
  var is_comment_from_originator = null;
  var is_allowed_author = null
  // Debug
  // const context = JSON.stringify(github.context, undefined, 2)
  // console.log(`The entire github context: ${context}`);
  // console.log(`Now on to the fun stuff!`);

  if (github.context.eventName == "issue_comment" && github.context.payload.issue.hasOwnProperty("pull_request") ) {
    console.log(`The comment is from a PR`)
    is_pr_comment = true;

    const issue = github.context.payload.issue
    
    console.log(`The PR url is: ${issue.pull_request.html_url}`)
    const start_index = issue.pull_request.html_url.lastIndexOf('/') + 1
    pr_number = issue.pull_request.html_url.substring(start_index)
    console.log(`The PR number is: ${pr_number}`)

    // Test if author has an allowed association
    console.log(`Is the PR is from an allowed author (is ${github.context.payload.comment.author_association} in ${allowed_author_associations}?)`)
    if (allowed_author_associations.includes(github.context.payload.comment.author_association)) {
      is_allowed_author = true
    } else {
      is_allowed_author = false
    }
    console.log(`    ${is_allowed_author}`)

    // Test if author is PR originator
    console.log(`Is the PR from the originator (is ${github.context.payload.comment.user.login} == ${github.context.payload.issue.user.login}?)`)
    if (github.context.payload.comment.user.login == github.context.payload.issue.user.login) {
      is_comment_from_originator = true
    } else {
      is_comment_from_originator = false
    }
    console.log(`    ${is_comment_from_originator}`)

  } else {
    console.log(`The comment is not from a PR`)
  }
  core.setOutput("is_pr_comment", is_pr_comment)
  core.setOutput("pr_number", pr_number)
  core.setOutput("allowed_author", is_allowed_author)
  core.setOutput("from_pr_originator", is_comment_from_originator)
} catch (error) {
  core.setFailed(error.message);
}
