<!-- markdownlint-disable -->
<!-- THIS DOCUMENT IS AUTO-GENERATED -->

# Commands

- [`pjr`](#pjr) - Root command for the Projector CLI
  - [`pjr playbook`](#pjr-playbook) - Interacting with the Code-With-Engineering Playbook
    - [`pjr playbook template`](#pjr-playbook-template) - Discover and use templates from the code-with engineering playbook
      - [`pjr playbook template init`](#pjr-playbook-template-init) - Copy templates from playbook to local working directory
      - [`pjr playbook template list`](#pjr-playbook-template-list) - List available templates.
  - [`pjr project`](#pjr-project) - Interacting with a target project
    - [`pjr project sprints`](#pjr-project-sprints) - Sprint Management
      - [`pjr project sprints create`](#pjr-project-sprints-create) - Create Sprints with Agile Provider
    - [`pjr project template`](#pjr-project-template) - Template Management
      - [`pjr project template deploy`](#pjr-project-template-deploy) - Template Deployment
      - [`pjr project template import`](#pjr-project-template-import) - Project Template Import
  - [`pjr version`](#pjr-version) - Print current projector version

## `pjr`

```
Usage: pjr [options] [command]

Root command for the Projector CLI

Options:
  -h, --help  display help for command

Commands:
  playbook    Interacting with the Code-With-Engineering Playbook
  project     Interacting with a target project
  version     Print current projector version
```
## `pjr playbook`

```
Usage: pjr playbook [options] [command]

Interacting with the Code-With-Engineering Playbook

Options:
  -h, --help  display help for command

Commands:
  template    Discover and use templates from the code-with engineering playbook
```
## `pjr playbook template`

```
Usage: pjr playbook template [options] [command]

Discover and use templates from the code-with engineering playbook

Options:
  -h, --help      display help for command

Commands:
  init [options]  Copy templates from playbook to local working directory
  list [options]  List available templates.
```
## `pjr playbook template init`

```
Usage: pjr playbook template init [options]

Copy templates from playbook to local working directory

Options:
  -p, --playbook-access-token <playbookAccessToken>  Optional GitHub access token. Authorized requests have higher request limits
                                                     Can be provided via environment variable PLAYBOOK_ACCESS_TOKEN
                                                     Can be provided interactively by user if not available
  -b, --branch <branch>                              Branch of playbook repo to use
  -t, --template-name <template-name>                Playbook template name
  -o, --out-path <out-path>                          Local path to which file will be written.
  -h, --help                                         display help for command
```
## `pjr playbook template list`

```
Usage: pjr playbook template list [options]

List available templates.

Options:
  -p, --playbook-access-token <playbookAccessToken>  Optional GitHub access token. Authorized requests have higher request limits
                                                     Can be provided via environment variable PLAYBOOK_ACCESS_TOKEN
                                                     Can be provided interactively by user if not available
  -h, --help                                         display help for command
```
## `pjr project`

```
Usage: pjr project [options] [command]

Interacting with a target project

Options:
  -h, --help  display help for command

Commands:
  sprints     Sprint Management
  template    Template Management
```
## `pjr project sprints`

```
Usage: pjr project sprints [options] [command]

Sprint Management

Options:
  -h, --help        display help for command

Commands:
  create [options]  Create Sprints with Agile Provider
```
## `pjr project sprints create`

```
Usage: pjr project sprints create [options]

Create Sprints with Agile Provider

Options:
  -a, --agile-provider <agileProvider>  Agile Provider
                                        Can be provided via environment variable AGILE_SERVICE_PROVIDER
                                        Can be provided interactively by user if not available
                                        Options: (azdo, github, jira)
  -u, --base-url <baseUrl>              Base URL for Agile Service Provider. Be sure to include the organization name (e.g. https://dev.azure.com/microsoft or https://github.com/microsoft)
                                        Can be provided via environment variable AGILE_BASE_URL
                                        Can be provided interactively by user if not available
  -t, --access-token <accessToken>      Access token for your Agile Service Provider
                                        Can be provided via environment variable AGILE_ACCESS_TOKEN
                                        Can be provided interactively by user if not available
  -p, --project-name <projectName>      Project name for your Agile Provider
                                        Can be provided via environment variable AGILE_PROJECT_NAME
                                        Can be provided interactively by user if not available
  -h, --help                            display help for command
```
## `pjr project template`

```
Usage: pjr project template [options] [command]

Template Management

Options:
  -h, --help        display help for command

Commands:
  deploy [options]  Template Deployment
  import [options]  Project Template Import
```
## `pjr project template deploy`

```
Usage: pjr project template deploy [options]

Template Deployment

Options:
  -f, --file <file>                     File containing backlog item template
                                        Can be provided interactively by user if not available
  -a, --agile-provider <agileProvider>  Agile Provider
                                        Can be provided via environment variable AGILE_SERVICE_PROVIDER
                                        Can be provided interactively by user if not available
                                        Options: (azdo, github, jira)
  -u, --base-url <baseUrl>              Base URL for Agile Service Provider. Be sure to include the organization name (e.g. https://dev.azure.com/microsoft or https://github.com/microsoft)
                                        Can be provided via environment variable AGILE_BASE_URL
                                        Can be provided interactively by user if not available
  -t, --access-token <accessToken>      Access token for your Agile Service Provider
                                        Can be provided via environment variable AGILE_ACCESS_TOKEN
                                        Can be provided interactively by user if not available
  -p, --project-name <projectName>      Project name for your Agile Provider
                                        Can be provided via environment variable AGILE_PROJECT_NAME
                                        Can be provided interactively by user if not available
  -h, --help                            display help for command
```
## `pjr project template import`

```
Usage: pjr project template import [options]

Project Template Import

Options:
  -f, --format <format>                 Format to save the file in
                                        Can be provided interactively by user if not available
                                        Options: (.json, .yml)
  -d, --directory <directory>           Directory to write to, which will be created if it does not exist.
                                        Can be provided interactively by user if not available
  -a, --agile-provider <agileProvider>  Agile Provider
                                        Can be provided via environment variable AGILE_SERVICE_PROVIDER
                                        Can be provided interactively by user if not available
                                        Options: (azdo, github, jira)
  -u, --base-url <baseUrl>              Base URL for Agile Service Provider. Be sure to include the organization name (e.g. https://dev.azure.com/microsoft or https://github.com/microsoft)
                                        Can be provided via environment variable AGILE_BASE_URL
                                        Can be provided interactively by user if not available
  -t, --access-token <accessToken>      Access token for your Agile Service Provider
                                        Can be provided via environment variable AGILE_ACCESS_TOKEN
                                        Can be provided interactively by user if not available
  -p, --project-name <projectName>      Project name for your Agile Provider
                                        Can be provided via environment variable AGILE_PROJECT_NAME
                                        Can be provided interactively by user if not available
  -h, --help                            display help for command
```
## `pjr version`

```
Usage: pjr version [options]

Print current projector version

Options:
  -h, --help  display help for command
```