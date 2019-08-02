Run locally with: `./node_modules/.bin/vue-cli-service serve`

## deploy like this

1. make changes
2. `npm run build` to build dist
3. push separate branches with `git subtree push --prefix dist origin gh-pages`
4. push master branch as usual

via: https://gist.github.com/cobyism/4730490