# Summary

This action emits a JSON list of the relative paths to any Juju Charms in this directory.

# Example usage

Example workflow: 
```yaml
name: Demo get-charm-paths

on:
  workflow_dispatch:

jobs:
  get-charm-paths-bash:
    name: Generate the Charm Matrix content (bash)
    runs-on: ubuntu-latest
    outputs:
      charm_paths: ${{ steps.get-charm-paths.outputs.charm-paths }}
    steps:
      - uses: actions/checkout@v2
        with: 
          fetch-depth: 0
      - name: Get paths for all charms in this repo
        id: get-charm-paths
        uses: ca-scribner/github-actions-recipes/get-charm-paths@master

  echo-charm-paths-bash:
    name: Echo charm paths emitted (bash)
    runs-on: ubuntu-latest
    needs: get-charm-paths-bash
    steps:
      - run: |
          echo "Got charm_paths: ${{ needs.get-charm-paths-bash.outputs.charm_paths }}"

  use-charm-paths-bash:
    name: Use charm paths in a matrix (bash)
    runs-on: ubuntu-latest
    needs: get-charm-paths-bash
    strategy:
      fail-fast: false
      matrix:
        charm-path: ${{ fromJson(needs.get-charm-paths-bash.outputs.charm_paths) }}
    steps:
      - run: |
          echo "Got charm path: ${{ matrix.charm-path }}"
```
