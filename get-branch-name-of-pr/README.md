# Summary

This action returns the name of the branch associated with a pull request

# Example usage

uses: ca-scribner/github-actions-recipes/get-branch-name-of-pr@master
  id: get-branch-name-of-pr
  with: 
    owner: 'ca-scribner'
    repository: 'github-actions-recipes'
    pr_number: 21
