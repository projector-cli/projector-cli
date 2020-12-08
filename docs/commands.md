<!-- markdownlint-disable -->
<!-- THIS DOCUMENT IS AUTO-GENERATED -->

# Commands

- [`pjr`](#pjr) - Root command for the Projector CLI
  - [`pjr agile`](#pjr-agile) - Agile Configuration Management
    - [`pjr agile sprints`](#pjr-agile-sprints) - Sprint Management
      - [`pjr agile sprints create`](#pjr-agile-sprints-create) - Create Sprints with Agile Provider
    - [`pjr agile project`](#pjr-agile-project) - Project Management
      - [`pjr agile project create`](#pjr-agile-project-create) - Create Project with Agile Provider
      - [`pjr agile project delete`](#pjr-agile-project-delete) - Delete Project with Agile Provider
    - [`pjr agile work`](#pjr-agile-work) - Work Item Management
      - [`pjr agile work create`](#pjr-agile-work-create) - Work Item Creation
      - [`pjr agile work import`](#pjr-agile-work-import) - Work Item Import
      - [`pjr agile work template`](#pjr-agile-work-template) - Work Item Templates
        - [`pjr agile work template init`](#pjr-agile-work-template-init) - Initialize work item template
        - [`pjr agile work template list`](#pjr-agile-work-template-list) - List available work item templates
  - [`pjr links`](#pjr-links) - Commonly used links in CSE
    - [`pjr links snowball`](#pjr-links-snowball) - Track your work in CSE
    - [`pjr links playbook`](#pjr-links-playbook) - The Code-With Engineering Playbook
    - [`pjr links playbook-issues`](#pjr-links-playbook-issues) - Issues in the Code-With Engineering Playbook
  - [`pjr playbook`](#pjr-playbook) - Interacting with the Code-With-Engineering Playbook
    - [`pjr playbook issues`](#pjr-playbook-issues) - Interacting with issues in the code-with engineering playbook
      - [`pjr playbook issues create`](#pjr-playbook-issues-create) - Create a playbook issue
      - [`pjr playbook issues open`](#pjr-playbook-issues-open) - View issues in the code-with engineering playbook
    - [`pjr playbook template`](#pjr-playbook-template) - Discover and use templates from the code-with engineering playbook
      - [`pjr playbook template init`](#pjr-playbook-template-init) - Copy templates from playbook to local working directory
      - [`pjr playbook template list`](#pjr-playbook-template-list) - List available templates.
  - [`pjr repo`](#pjr-repo) - Repository management
    - [`pjr repo create`](#pjr-repo-create) - Create a repository
  - [`pjr version`](#pjr-version) - Print current projector version

## `pjr`

```
Usage: pjr [options] [command]

Root command for the Projector CLI

Options:
  -h, --help  display help for command

Commands:
  agile       Agile Configuration Management
  links       Commonly used links in CSE
  playbook    Interacting with the Code-With-Engineering Playbook
  repo        Repository management
  version     Print current projector version
```
## `pjr agile`

```
Usage: pjr agile [options] [command]

Agile Configuration Management

Options:
  -h, --help  display help for command

Commands:
  sprints     Sprint Management
  project     Project Management
  work        Work Item Management
```
## `pjr agile sprints`

```
Usage: pjr agile sprints [options] [command]

Sprint Management

Options:
  -h, --help        display help for command

Commands:
  create [options]  Create Sprints with Agile Provider
```
## `pjr agile sprints create`

```
Usage: pjr agile sprints create [options]

Create Sprints with Agile Provider

Options:
  -a, --agile-provider <agileProvider>  Agile ProviderAgile Provider
                                        Can be provided via environment
                                        variable AGILE_SERVICE_PROVIDER
                                        Can be provided interactively by user
                                        if not available
                                        Options: (azdo, github, jira)
  -u, --base-url <baseUrl>              Base URL for Agile Service Provider. Be
                                        sure to include the organization name
                                        (e.g. https://dev.azure.com/microsoft
                                        or https://github.com/microsoft)Base
                                        URL for Agile Service Provider. Be sure
                                        to include the organization name (e.g.
                                        https://dev.azure.com/microsoft or
                                        https://github.com/microsoft)
                                        Can be provided via environment
                                        variable AGILE_BASE_URL
                                        Can be provided interactively by user
                                        if not available
  -t, --access-token <accessToken>      Access token for your Agile Service
                                        ProviderAccess token for your Agile
                                        Service Provider
                                        Can be provided via environment
                                        variable AGILE_ACCESS_TOKEN
                                        Can be provided interactively by user
                                        if not available
  -p, --project-name <projectName>      Project name for your Agile
                                        ProviderProject name for your Agile
                                        Provider
                                        Can be provided via environment
                                        variable AGILE_PROJECT_NAME
                                        Can be provided interactively by user
                                        if not available
  -h, --help                            display help for command
```
## `pjr agile project`

```
Usage: pjr agile project [options] [command]

Project Management

Options:
  -h, --help        display help for command

Commands:
  create [options]  Create Project with Agile Provider
  delete [options]  Delete Project with Agile Provider
```
## `pjr agile project create`

```
Usage: pjr agile project create [options]

Create Project with Agile Provider

Options:
  -a, --agile-provider <agileProvider>            Agile ProviderAgile Provider
  Can be provided via environment variable AGILE_SERVICE_PROVIDER
  Can be provided interactively by user if not available
  Options: (azdo, github, jira)
  -u, --base-url <baseUrl>                        Base URL for Agile Service Provider. Be sure to include the organization name (e.g. https://dev.azure.com/microsoft or https://github.com/microsoft)Base URL for Agile Service Provider. Be sure to include the organization name (e.g. https://dev.azure.com/microsoft or https://github.com/microsoft)
  Can be provided via environment variable AGILE_BASE_URL
  Can be provided interactively by user if not available
  -t, --access-token <accessToken>                Access token for your Agile Service ProviderAccess token for your Agile Service Provider
  Can be provided via environment variable AGILE_ACCESS_TOKEN
  Can be provided interactively by user if not available
  -p, --project-name <projectName>                Project name for your Agile ProviderProject name for your Agile Provider
  Can be provided via environment variable AGILE_PROJECT_NAME
  Can be provided interactively by user if not available
  -d, --project-description <projectDescription>  Project DescriptionProject Description
  Can be provided interactively by user if not available
  -h, --help                                      display help for command
```
## `pjr agile project delete`

```
Usage: pjr agile project delete [options]

Delete Project with Agile Provider

Options:
  -a, --agile-provider <agileProvider>  Agile ProviderAgile Provider
                                        Can be provided via environment
                                        variable AGILE_SERVICE_PROVIDER
                                        Can be provided interactively by user
                                        if not available
                                        Options: (azdo, github, jira)
  -u, --base-url <baseUrl>              Base URL for Agile Service Provider. Be
                                        sure to include the organization name
                                        (e.g. https://dev.azure.com/microsoft
                                        or https://github.com/microsoft)Base
                                        URL for Agile Service Provider. Be sure
                                        to include the organization name (e.g.
                                        https://dev.azure.com/microsoft or
                                        https://github.com/microsoft)
                                        Can be provided via environment
                                        variable AGILE_BASE_URL
                                        Can be provided interactively by user
                                        if not available
  -t, --access-token <accessToken>      Access token for your Agile Service
                                        ProviderAccess token for your Agile
                                        Service Provider
                                        Can be provided via environment
                                        variable AGILE_ACCESS_TOKEN
                                        Can be provided interactively by user
                                        if not available
  -p, --project-name <projectName>      Project name for your Agile
                                        ProviderProject name for your Agile
                                        Provider
                                        Can be provided via environment
                                        variable AGILE_PROJECT_NAME
                                        Can be provided interactively by user
                                        if not available
  -h, --help                            display help for command
```
## `pjr agile work`

```
Usage: pjr agile work [options] [command]

Work Item Management

Options:
  -h, --help        display help for command

Commands:
  create [options]  Work Item Creation
  import [options]  Work Item Import
  template          Work Item Templates
```
## `pjr agile work create`

```
Usage: pjr agile work create [options]

Work Item Creation

Options:
  -f, --file <file>                     File containing backlog item template
  -f, --file <file>                     undefinedundefined
                                        Can be provided interactively by user
                                        if not available
  -a, --agile-provider <agileProvider>  Agile ProviderAgile Provider
                                        Can be provided via environment
                                        variable AGILE_SERVICE_PROVIDER
                                        Can be provided interactively by user
                                        if not available
                                        Options: (azdo, github, jira)
  -u, --base-url <baseUrl>              Base URL for Agile Service Provider. Be
                                        sure to include the organization name
                                        (e.g. https://dev.azure.com/microsoft
                                        or https://github.com/microsoft)Base
                                        URL for Agile Service Provider. Be sure
                                        to include the organization name (e.g.
                                        https://dev.azure.com/microsoft or
                                        https://github.com/microsoft)
                                        Can be provided via environment
                                        variable AGILE_BASE_URL
                                        Can be provided interactively by user
                                        if not available
  -t, --access-token <accessToken>      Access token for your Agile Service
                                        ProviderAccess token for your Agile
                                        Service Provider
                                        Can be provided via environment
                                        variable AGILE_ACCESS_TOKEN
                                        Can be provided interactively by user
                                        if not available
  -p, --project-name <projectName>      Project name for your Agile
                                        ProviderProject name for your Agile
                                        Provider
                                        Can be provided via environment
                                        variable AGILE_PROJECT_NAME
                                        Can be provided interactively by user
                                        if not available
  -h, --help                            display help for command
```
## `pjr agile work import`

```
Usage: pjr agile work import [options]

Work Item Import

Options:
  -f, --format <format>                 Format to save the file inFormat to
                                        save the file in
                                        Can be provided interactively by user
                                        if not available
                                        Options: (.json, .yml)
  -d, --directory <directory>           Directory to write to, which will be
                                        created if it does not exist.Directory
                                        to write to, which will be created if
                                        it does not exist.
                                        Can be provided interactively by user
                                        if not available
  -a, --agile-provider <agileProvider>  Agile ProviderAgile Provider
                                        Can be provided via environment
                                        variable AGILE_SERVICE_PROVIDER
                                        Can be provided interactively by user
                                        if not available
                                        Options: (azdo, github, jira)
  -u, --base-url <baseUrl>              Base URL for Agile Service Provider. Be
                                        sure to include the organization name
                                        (e.g. https://dev.azure.com/microsoft
                                        or https://github.com/microsoft)Base
                                        URL for Agile Service Provider. Be sure
                                        to include the organization name (e.g.
                                        https://dev.azure.com/microsoft or
                                        https://github.com/microsoft)
                                        Can be provided via environment
                                        variable AGILE_BASE_URL
                                        Can be provided interactively by user
                                        if not available
  -t, --access-token <accessToken>      Access token for your Agile Service
                                        ProviderAccess token for your Agile
                                        Service Provider
                                        Can be provided via environment
                                        variable AGILE_ACCESS_TOKEN
                                        Can be provided interactively by user
                                        if not available
  -p, --project-name <projectName>      Project name for your Agile
                                        ProviderProject name for your Agile
                                        Provider
                                        Can be provided via environment
                                        variable AGILE_PROJECT_NAME
                                        Can be provided interactively by user
                                        if not available
  -h, --help                            display help for command
```
## `pjr agile work template`

```
Usage: pjr agile work template [options] [command]

Work Item Templates

Options:
  -h, --help      display help for command

Commands:
  init [options]  Initialize work item template
  list [options]  List available work item templates
```
## `pjr agile work template init`

```
Usage: pjr agile work template init [options]

Initialize work item template

Options:
  -a, --agile-provider <agileProvider>               Agile ProviderAgile Provider
  Can be provided via environment variable AGILE_SERVICE_PROVIDER
  Can be provided interactively by user if not available
  Options: (azdo, github, jira)
  -u, --base-url <baseUrl>                           Base URL for Agile Service Provider. Be sure to include the organization name (e.g. https://dev.azure.com/microsoft or https://github.com/microsoft)Base URL for Agile Service Provider. Be sure to include the organization name (e.g. https://dev.azure.com/microsoft or https://github.com/microsoft)
  Can be provided via environment variable AGILE_BASE_URL
  Can be provided interactively by user if not available
  -t, --access-token <accessToken>                   Access token for your Agile Service ProviderAccess token for your Agile Service Provider
  Can be provided via environment variable AGILE_ACCESS_TOKEN
  Can be provided interactively by user if not available
  -p, --project-name <projectName>                   Project name for your Agile ProviderProject name for your Agile Provider
  Can be provided via environment variable AGILE_PROJECT_NAME
  Can be provided interactively by user if not available
  -p, --playbook-access-token <playbookAccessToken>  Optional GitHub access token. Authorized requests have higher request limitsOptional GitHub access token. Authorized requests have higher request limits
  Can be provided via environment variable PLAYBOOK_ACCESS_TOKEN
  Can be provided interactively by user if not available
  -t, --template-name <template-name>                Work Item Template Name
  -o, --out-path <out-path>                          Output file name for initialized work item template. Defaults to template name if not provided
  -h, --help                                         display help for command
```
## `pjr agile work template list`

```
Usage: pjr agile work template list [options]

List available work item templates

Options:
  -a, --agile-provider <agileProvider>               Agile ProviderAgile Provider
  Can be provided via environment variable AGILE_SERVICE_PROVIDER
  Can be provided interactively by user if not available
  Options: (azdo, github, jira)
  -u, --base-url <baseUrl>                           Base URL for Agile Service Provider. Be sure to include the organization name (e.g. https://dev.azure.com/microsoft or https://github.com/microsoft)Base URL for Agile Service Provider. Be sure to include the organization name (e.g. https://dev.azure.com/microsoft or https://github.com/microsoft)
  Can be provided via environment variable AGILE_BASE_URL
  Can be provided interactively by user if not available
  -t, --access-token <accessToken>                   Access token for your Agile Service ProviderAccess token for your Agile Service Provider
  Can be provided via environment variable AGILE_ACCESS_TOKEN
  Can be provided interactively by user if not available
  -p, --project-name <projectName>                   Project name for your Agile ProviderProject name for your Agile Provider
  Can be provided via environment variable AGILE_PROJECT_NAME
  Can be provided interactively by user if not available
  -p, --playbook-access-token <playbookAccessToken>  Optional GitHub access token. Authorized requests have higher request limitsOptional GitHub access token. Authorized requests have higher request limits
  Can be provided via environment variable PLAYBOOK_ACCESS_TOKEN
  Can be provided interactively by user if not available
  -h, --help                                         display help for command
```
## `pjr links`

```
Usage: pjr links [options] [command]

Commonly used links in CSE

Options:
  -h, --help       display help for command

Commands:
  snowball         Track your work in CSE
  playbook         The Code-With Engineering Playbook
  playbook-issues  Issues in the Code-With Engineering Playbook
```
## `pjr links snowball`

```
Usage: pjr links snowball [options]

Track your work in CSE

Options:
  -h, --help  display help for command
```
## `pjr links playbook`

```
Usage: pjr links playbook [options]

The Code-With Engineering Playbook

Options:
  -h, --help  display help for command
```
## `pjr links playbook-issues`

```
Usage: pjr links playbook-issues [options]

Issues in the Code-With Engineering Playbook

Options:
  -h, --help  display help for command
```
## `pjr playbook`

```
Usage: pjr playbook [options] [command]

Interacting with the Code-With-Engineering Playbook

Options:
  -h, --help  display help for command

Commands:
  issues      Interacting with issues in the code-with engineering playbook
  template    Discover and use templates from the code-with engineering
              playbook
```
## `pjr playbook issues`

```
Usage: pjr playbook issues [options] [command]

Interacting with issues in the code-with engineering playbook

Options:
  -h, --help  display help for command

Commands:
  create      Create a playbook issue
  open        View issues in the code-with engineering playbook
```
## `pjr playbook issues create`

```
Usage: pjr playbook issues create [options]

Create a playbook issue

Options:
  -h, --help  display help for command
```
## `pjr playbook issues open`

```
Usage: pjr playbook issues open [options]

View issues in the code-with engineering playbook

Options:
  -h, --help  display help for command
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
  -p, --playbook-access-token <playbookAccessToken>  Optional GitHub access token. Authorized requests have higher request limitsOptional GitHub access token. Authorized requests have higher request limits
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
  -p, --playbook-access-token <playbookAccessToken>  Optional GitHub access token. Authorized requests have higher request limitsOptional GitHub access token. Authorized requests have higher request limits
  Can be provided via environment variable PLAYBOOK_ACCESS_TOKEN
  Can be provided interactively by user if not available
  -h, --help                                         display help for command
```
## `pjr repo`

```
Usage: pjr repo [options] [command]

Repository management

Options:
  -h, --help        display help for command

Commands:
  create [options]  Create a repository
```
## `pjr repo create`

```
Usage: pjr repo create [options]

Create a repository

Options:
  -r, --repo-provider <repoProvider>  Repo Service ProviderRepo Service
                                      Provider
                                      Can be provided via environment variable
                                      REPO_SERVICE_PROVIDER
                                      Can be provided interactively by user if
                                      not available
                                      Options: (azdo, github)
  -u, --base-url <baseUrl>            Base URL for Agile Service Provider. Be
                                      sure to include the organization name
                                      (e.g. https://dev.azure.com/microsoft or
                                      https://github.com/microsoft)Base URL for
                                      Agile Service Provider. Be sure to
                                      include the organization name (e.g.
                                      https://dev.azure.com/microsoft or
                                      https://github.com/microsoft)
                                      Can be provided via environment variable
                                      AGILE_BASE_URL
                                      Can be provided interactively by user if
                                      not available
  -t, --access-token <accessToken>    Access token for your Agile Service
                                      ProviderAccess token for your Agile
                                      Service Provider
                                      Can be provided via environment variable
                                      AGILE_ACCESS_TOKEN
                                      Can be provided interactively by user if
                                      not available
  -p, --project-name <projectName>    Project name for your Repo
                                      ProviderProject name for your Repo
                                      Provider
                                      Can be provided via environment variable
                                      AGILE_PROJECT_NAME
                                      Can be provided interactively by user if
                                      not available
                                      Only valid for repo providers: (azdo)
  -n, --repo-name <repoName>          Repo nameRepo name
                                      Can be provided via environment variable
                                      REPO_NAME
                                      Can be provided interactively by user if
                                      not available
  -h, --help                          display help for command
```
## `pjr version`

```
Usage: pjr version [options]

Print current projector version

Options:
  -h, --help  display help for command
```