# Summary

This action emits a JSON list of the relative paths to any Juju Charms in this directory.

# Example usage

An example workflow using this action is shown below.

```
name: Demo get-charm-paths

on:
  workflow_call:

jobs:
  get-charm-paths:
    name: Generate the Charm Matrix content
    runs-on: ubuntu-latest
    outputs:
      charm_paths: ${{ steps.get-charm-paths.outputs.charm_paths }}
    steps:
      - uses: actions/checkout@v2
        with: 
          fetch-depth: 0
          ref: ${{ inputs.source_branch }}
      - name: Get paths for all charms in this repo
        id: get-charm-paths
        uses: ca-scribner/github-actions-recipes/get-charm-paths-python@master

  use-charm-paths:
    name: Use charm paths in a matrix
    runs-on: ubuntu-latest
    needs: get-charm-paths
    strategy:
      fail-fast: false
      matrix:
        charm-path: ${{ fromJson(needs.get-charm-paths.outputs.charm_paths) }}
    steps:
      - run: echo "Got charm path: ${{ matrix.charm-path }}"
```
