## Summary

Dumps logs relevant to kubernetes-based Juju charms to a Github Artifact.

Logs are both printed to screen and dumped to the artifact "juju-kubernetes-charmcraft-logs".

Prerequisites for running this action in a workflow:
* kubectl (with a kube config for the relevant cluster)
* Juju bootstrapped on the runner

Warning: This dumps a lot of details from your kubernetes cluster and juju models.
Before sending this information to anyone, you should inspect it to ensure no
sensitive information is being shared.

## Example usage

TODO: Complete the path below once this is placed in a longterm location.

```yaml
- uses: org/repo/dump-charm-ci-artifacts@version
  # always() if you want this to run on every run, regardless of failure. 
  # more details: https://docs.github.com/en/actions/learn-github-actions/expressions#status-check-functions
  if: always()
```
