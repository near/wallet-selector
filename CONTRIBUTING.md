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

Build and deploy react example

```bash
yarn nx build angular # build the angular example
yarn nx deploy angular # deploys angular example to gh-pages
```
