# Github Actions Recipes

This is a collection of recipes for Github Actions, as well as a messy sandbox used for debugging concepts and practicing how not to write an informative git commit message.  Nothing really **does work** here, just a bunch of proof of concept items that remind me how to do things for when I inevitably forget...

# repository_dispatch

See [.github/workflows/dispatch_event.yml](.github/workflows/dispatch_event.yml) for example of handling repository_dispatch events.  These are triggered by:

```
curl -X POST \
  -H "authorization: token SOME_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{"event_type": "my_dispatch_event", "client_payload": {"key1": "value1", "comment": "I have a lot of feels"}}' \
  https://api.github.com/repos/ca-scribner/github-actions-recipes/dispatches
  
# Triggers a specific part of the workflow
curl -X POST \
  -H "authorization: token SOME_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -d '{"event_type": "my_print_comment_dispatch_event", "client_payload": {"key1": "value1", "comment": "I have a lot of feels"}}' \
  https://api.github.com/repos/ca-scribner/github-actions-recipes/dispatches
```
