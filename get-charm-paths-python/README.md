# Summary

This action emits a JSON list of the relative paths to any Juju Charms in this directory.

# Example usage

Example workflow:

```yaml
name: Demo get-charm-paths

on:
  workflow_dispatch:

jobs:
  get-charm-paths-python:
    name: Generate the Charm Matrix content (python)
    runs-on: ubuntu-latest
    outputs:
      charm_paths: ${{ steps.get-charm-paths.outputs.charm-paths }}
    steps:
      - uses: actions/checkout@v2
        with:
          fetch-depth: 0
      - name: Get paths for all charms in this repo
        id: get-charm-paths
        uses: ca-scribner/github-actions-recipes/get-charm-paths-python@master

  echo-charm-paths-python:
    name: Echo charm paths emitted (python)
    runs-on: ubuntu-latest
    needs: get-charm-paths-python
    steps:
      - run: |
          echo "Got charm_paths: ${{ needs.get-charm-paths-python.outputs.charm_paths }}"

  use-charm-paths-python:
    name: Use charm paths in a matrix (python)
    runs-on: ubuntu-latest
    needs: get-charm-paths-python
    strategy:
      fail-fast: false
      matrix:
        charm-path: ${{ fromJson(needs.get-charm-paths-python.outputs.charm_paths) }}
    steps:
      - run: |
          echo "Got charm path: ${{ matrix.charm-path }}"
```
