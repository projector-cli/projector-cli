# 📽 Projector: The CLI for bootstrapping projects <!-- omit in toc -->
<!-- markdown-link-check-disable -->
[![npm version](https://badge.fury.io/js/pjr.svg)](https://badge.fury.io/js/pjr)
<!-- markdown-link-check-enable-->
## Table of Contents <!-- omit in toc -->

- [About](#about)
- [Commands](#commands)
- [Getting Started](#getting-started)
- [Contribution Guidelines](#contribution-guidelines)
- [Developer Guidelines](#developer-guidelines)
- [Application Telemetry](#application-telemetry)
- [Maintainers](#maintainers)
- [License](#license)
- [FAQ](#faq)
  - [Running `pjr` the first time fails](#running-pjr-the-first-time-fails)

## About

`projector` is a tool that was created as an effort to reduce duplicated work in bootstrapping projects.
It aims to reduce friction, time and effort for developer teams in the following use cases:

- **Discovering** and **consuming** content from an engineering playbook, such as the [Code-With Engineering Playbook](https://github.com/Microsoft/code-with-engineering-playbook).
- Creating **templatized work items** within Agile providers (e.g. Azure DevOps, Jira, GitHub).
  This can be used to create shared "checklists" of stories/features/tasks that should exist within every engagement and add them right to the developer team's backlog.
  These are also known as **packaged sprints**.
- **Creating a sprint schedule** for the project within the Agile provider.
  Rather than clicking around Azure DevOps every week to create a new sprint, this is a one command execution that will generate as many sprints as required of the desired length and start date.
- Opening **commonly used links** in your playbook.
Could be helpful when onboarding new engineers to a playbook.
- ...and more to come! We hope to receive feedback and ideas from engineers on what tasks they do most frequently to manage their projects and how we can automate them through the command line.

## Commands

See the [commands doc](./docs/commands.md) for usage and description of each command.

## Getting Started

Projector runs on Node 14+.
To install the `pjr` CLI tool, run:

```sh
npm i pjr -g
```

To see how to accomplish the tasks above using `pjr` commands, follow the [how-to documentation](./docs/how_to.md).

## Contribution Guidelines

See our [contribution guidelines doc](./CONTRIBUTING.md) for more info on how you can contribute to `projector`.

## Developer Guidelines

See our [local development documentation](./docs/DEVELOPER.md) for things like installing, linting, building, testing and more.

## Application Telemetry

Projector uses Application Insights to better understand and fix errors that come up in the CLI.
To opt out of this, set the environment variable `TELEMETRY_ENABLED=0`.
This can be done manually in whatever shell you're using or in the `.projector.env` file that is picked up by Projector.

## Maintainers

For any questions about the project, please reach out to any one of the project maintainers:

- [Alex Lancaster](mailto:alancast@umich.edu)
- [Elizabeth Halper](mailto:elhalper@microsoft.com)
- [Tanner Barlow](mailto:tanner.barlow12@gmail.com)
- [Zach Miller](mailto:zmmille2@gmail.com)

## License

[MIT](./LICENSE)

## FAQ

Here are some common problems and solutions to issues in projector.

### Running `pjr` the first time fails

When running `pjr` for the first time, if you encounter an error like the following:

```sh
$ pjr
internal/modules/cjs/loader.js:638
    throw err;
    ^
Error: Cannot find module 'fs/promises'
```

Make sure you are running Node version 14+.

```sh
$ node --version
v14.x
```
