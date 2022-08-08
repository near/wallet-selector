# Contributing

This project is using an [NX](https://nx.dev) style [monorepository](https://monorepo.tools) that helps divide and map the project dependencies for each project.

The core modules are in the `packages` directory and the example apps are in the `examples` directory. In order to figure out the commands you need to run, you can use the `nx` command line tool.

> You can also use the infix notation to run a target:
 nx [target] [project] [options, ...]

On the other hand, if you want to run a specific command in a package, you can use the `nx run` command. There are a lot of things defined in every project's `project.json` file:

To run a target:    
```bash
yarn nx run [project][:target][:configuration] [options, ...]
yarn nx r [project][:target][:configuration] [options, ...]
```

In order to run a specific example, make sure you build the packages beforehand by running:

```bash
yarn build:all # builds all packages

yarn nx serve react # run the react example
yarn nx serve angular # run the angular example
```

> Note: [`modal-ui`](/packages/modal-ui) package must be re-build after every change in the source files of this package `yarn nx run modal-ui:build`


Build and deploy angular example

```bash
yarn nx build angular # build the angular example
yarn nx deploy angular # deploys angular example to gh-pages
```


# Branching

In this project branching is very simple, the most important branches are `main` and `dev` branch. Pushing or committing directly in these two branches is forbidden.

### Main branch

This is the default branch and will be equal the latest official release.

### Dev Branch

This is the branch for development used by the team and/or other contributors from the community.
New features, fixes and other improvements are first implemented and tested in this
branch.
When adding new features/fixes team members must always create a new branch based on latest changes of `dev` branch.
When your work is ready a merge request should be opened from your branch to `dev`.

### Other branches

Except `main` and `dev` branch other branches are work in progress by the team or related to the open PR(s).

# Release Process

Once the planned work has been finished and the set date has arrived a merge request from `dev` to `main` should be made.
After merging only two steps remain:</br>
 - Publish packages to NPM.
 - Draft release in Github.

Since `main` is the default branch of this project in case of regular release it will be always equal to the latest release.</br> In case of a `pre-release`  a specific branch will be linked to the `pre-release` version(tag).
