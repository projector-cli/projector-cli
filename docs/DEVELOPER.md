# Developer Documentation <!-- omit in toc -->

- [Development Container](#development-container)
- [Installing](#installing)
- [Building and Using CLI Locally](#building-and-using-cli-locally)
- [Running Tests Locally](#running-tests-locally)
  - [Unit Tests](#unit-tests)
  - [Integration Tests](#integration-tests)
    - [Creating a Valid `.env` File](#creating-a-valid-env-file)
- [Linting](#linting)
- [Code Quality Gates](#code-quality-gates)
- [Configuration](#configuration)
- [Documentation](#documentation)
  - [Command Documentation](#command-documentation)
  - [Code Documentation](#code-documentation)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Updates to this Document](#updates-to-this-document)

## Development Container

**Prerequisites:**

- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [VS Code](https://code.visualstudio.com/)
- [Remote Development extension pack](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

This project supports the use of [development containers](https://code.visualstudio.com/docs/remote/containers). Dev
containers are a great way to package all development requirements into a docker image and running VS code from the
context of that docker image. Dev containers can also be used with [GitHub
Codespaces](https://code.visualstudio.com/docs/remote/codespaces) for a hosted development environment.

To use the dev container, follow the [Quick Start
instructions](https://code.visualstudio.com/docs/remote/containers#_quick-start-open-an-existing-folder-in-a-container)
in the VS code documentation. VS Code will restart itself and open in the context of the docker container with your
local repo mounted directly into the container so you will not lose any work if the container stops.

## Installing

After cloning the repository, run an install at the root of the repository:

```sh
npm ci
```

## Building and Using CLI Locally

To build the project, in the root of the repository, run:

```sh
npm run build
```

In order to use the CLI locally, in the root of the repository, run:

```sh
npm link
```

This will create a symbolic link on your local machine.
Then, from whichever directory you will be using the CLI tool, run:

```sh
npm link pjr
```

From that directory, you should then be able to run:

```sh
pjr
```

which should produce something like:

```sh
                  _           _
  _ __  _ __ ___ (_) ___  ___| |_ ___  _ __
 | '_ \| '__/ _ \| |/ _ \/ __| __/ _ \| '__|
 | |_) | | | (_) | |  __/ (__| || (_) | |
 | .__/|_|  \___// |\___|\___|\__\___/|_|
 |_|           |__/
? pjr: (Use arrow keys)
❯ agile - Agile Configuration Management
...
```

## Running Tests Locally

Running `npm test` triggers both unit and integration tests.
Integration tests require a valid `.env` file, which is discussed [below](#creating-a-valid-env-file).

### Unit Tests

To run unit tests only, run:

```sh
npm run test:unit
```

Unit tests use the `jest.config.unit.js` Jest configuration, which extends the `jest.config.js` configuration.

All unit tests should be able to pass locally on the `main` branch.
If that's not the case, please create an issue.

### Integration Tests

To run integration tests only, run:

```sh
npm run test:int
```

Integration tests use the `jest.config.integration.js` Jest configuration, which extends the `jest.config.js` configuration.

All integration tests should also be able to pass locally on the `main` branch, but it requires a valid `.env` file.

#### Creating a Valid `.env` File

In order for integration tests to pass, there must be a valid `.env` file at the root of the repository.
See [`.env.sample`](../.env.sample) for an example of what the file should look like.

## Linting

This project uses `eslint` with the following plugins:

- `@typescript-eslint`
- `jsdoc`
- `prettier`

and uses their recommended rules.

To run a lint check, run:

```sh
npm run lint
```

Many linting errors can be auto-fixed by running:

```sh
npm run lint:fix
```

## Code Quality Gates

The `main` branch is protected by the following code quality gates:

| Gate            | Provider          | Requirement |
| :-------------- | :---------------- | :---------- |
| Linting         | [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) | 0 warnings or errors |
| Building        | [TypeScript](https://www.typescriptlang.org/)                    | Project compiles with no errors |
| Tests           | [Jest](https://jestjs.io/)                                       | All unit and integration tests pass |
| Code Coverage   | [Codecov](https://about.codecov.io/)                             | 70% of patch covered, 90% of project covered, no drop in coverage |
| Static Analysis | [Sonar Cloud](https://sonarcloud.io/)                            | No new code smells, vulnerabilities, security hotspots or bugs |

To run linting, building, tests and coverage locally, run:

```sh
npm run check
```

## Configuration

We use the `config` library from `npm` with its configuration located at `src/config`.
See the [library docs](https://www.npmjs.com/package/config) for more information on usage.
At a high level, here is a description of how we are using it in this project:

- `default.json` - Default configuration values
- `custom-environment-variables.json` - Configuration values that map to the value of an environment variable at runtime

We wrap calls to `config` in our `Config` class (`configUtils.ts`).
In order to avoid errors when accessing the configuration value, the `Config` class expects keys to come from the `ConfigKey` enum (`configValues.ts`).
If you have a new value to add to configuration, add it to one of the above `.json` files and then add its key to the `ConfigKey` enum.

## Documentation

### Command Documentation

Documentation for `pjr` commands is auto-generated and written to the [command docs page](commands.md).
To generate the docs, at the root of the repository, run:

```sh
npm run docs:generate
```

If there are any changes to options, name or description of commands, make sure to re-generate the docs and include the results in a pull request.
We may add a pipeline step that commits the auto-generated docs back to the repository, but we currently rely on a manual run of the generation.

### Code Documentation

We use the `jsdoc` plugin to `eslint` to make sure docstrings are written for all applicable functions and classes.
All exported or public functions should have documentation.
For example:

```typescript
/**
 * This is an example function
 *
 * @param {string} param1 My first parameter
 * @param {number} param2 My second parameter
 * @returns {string} My result
 */
export function exampleFunction(param1: string, param2: number): string {
  ...
}
```

## Commit Message Guidelines

All pull requests are squash-merged, and the commit message for the resulting commit must follow the [conventional commit specification](https://www.conventionalcommits.org/en/v1.0.0-beta.2/).
As a quick summary, the commit message should look something like:

```sh
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

The commit message types include the following (from the Conventional Commit specification):

1. **fix:** a commit of the type fix patches a bug in your codebase (this correlates with PATCH in semantic versioning).
2. **feat:** a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in semantic versioning).
3. **BREAKING CHANGE:** a commit that has the text BREAKING CHANGE: at the beginning of its optional body or footer section introduces a breaking API change (correlating with MAJOR in semantic versioning).
  A breaking change can be part of commits of any type.
  e.g., a **fix:**, **feat:** & **chore:** types would all be valid, in addition to any other type.
4. Others: commit types other than **fix:** and **feat:** are allowed, for example `@commitlint/config-conventional` (based on the the Angular convention) recommends:
     - **chore:**
     - **docs:**
     - **style:**
     - **refactor:**
     - **perf:**
     - **test:**
     - and others.

    We also recommend improvement for commits that improve a current implementation without adding a new feature or fixing a bug.
    Notice these types are not mandated by the conventional commits specification, and have no implicit effect in semantic versioning (unless they include a BREAKING CHANGE, which is NOT recommended).
    A scope may be provided to a commit's type, to provide additional contextual information and is contained within parenthesis, e.g., feat(parser): add ability to parse arrays.

## Updates to this Document

As with all of our documentation, this is a living document.

If there are errors, please either [create an bug](https://dev.azure.com/dwrdev/projector/_backlogs/backlog/Projector%20Maintainers/Backlog%20items) or better yet, open a pull request with the fix.
