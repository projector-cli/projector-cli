<!-- markdownlint-disable -->
<!-- THIS DOCUMENT IS AUTO-GENERATED -->

# Commands

- [`pjr`](#pjr) - Root command for the Projector CLI
  - [`pjr playbook`](#pjr-playbook) - Interacting with the Code-With-Engineering Playbook
    - [`pjr playbook template`](#pjr-playbook-template) - Discover and use templates from the code-with engineering playbook
      - [`pjr playbook template copy`](#pjr-playbook-template-copy) - Copy templates from playbook to local working directory
      - [`pjr playbook template list`](#pjr-playbook-template-list) - List available templates.
    - [`pjr playbook add`](#pjr-playbook-add) - Add a playbook.
    - [`pjr playbook deselect`](#pjr-playbook-deselect) - Deselect a playbook.
    - [`pjr playbook list`](#pjr-playbook-list) - See status.
    - [`pjr playbook remove`](#pjr-playbook-remove) - Remove a playbook.
    - [`pjr playbook select`](#pjr-playbook-select) - Select a playbook.
    - [`pjr playbook status`](#pjr-playbook-status) - Check the status of playbooks.
  - [`pjr project`](#pjr-project) - Interacting with a target project
    - [`pjr project sprints`](#pjr-project-sprints) - Sprint Management
      - [`pjr project sprints create`](#pjr-project-sprints-create) - Create Sprints in Projects
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
  -h, --help          display help for command

Commands:
  template            Discover and use templates from the code-with engineering playbook
  add [options]       Add a playbook.
  deselect [options]  Deselect a playbook.
  list [options]      See status.
  remove [options]    Remove a playbook.
  select [options]    Select a playbook.
  status [options]    Check the status of playbooks.
```
## `pjr playbook template`

```
Usage: pjr playbook template [options] [command]

Discover and use templates from the code-with engineering playbook

Options:
  -h, --help      display help for command

Commands:
  copy [options]  Copy templates from playbook to local working directory
  list [options]  List available templates.
```
## `pjr playbook template copy`

```
Usage: pjr playbook template copy [options]

Copy templates from playbook to local working directory

Options:
  -b, --branch <branch>                Branch of playbook repo to use
  -o, --out-path <out-path>            Local path to which file will be written.
  -t, --template-name <template-name>  Playbook template name
  -h, --help                           display help for command
```
## `pjr playbook template list`

```
Usage: pjr playbook template list [options]

List available templates.

Options:
  -b          The branch to list the templates from in the targeted repositories.
  -h, --help  display help for command
```
## `pjr playbook add`

```
Usage: pjr playbook add [options]

Add a playbook.

Options:
  -a, --is-active <isActive>            If true, activates this playbook immediately.
                                        Can be provided interactively by user if not available
  -l, --location <location>             The location of the playbook, either a URL or a local path.
                                        Can be provided interactively by user if not available
  -p, --playbook-name <playbookName>    The name of the playbook to add.
                                        Can be provided interactively by user if not available
  -t, --templates-path <templatesPath>  The path where backlog item templates can be found.
                                        Can be provided interactively by user if not available
  -T, --token <token>                   A token with read permissions to the playbook.
                                        Can be provided interactively by user if not available
  -h, --help                            display help for command
```
## `pjr playbook deselect`

```
Usage: pjr playbook deselect [options]

Deselect a playbook.

Options:
  -a, --all <all>            If true, deselects all playbooks.
                             Can be provided interactively by user if not available
  -p, --playbook <playbook>  The name of the playbook to deselect.
                             Can be provided interactively by user if not available
  -h, --help                 display help for command
```
## `pjr playbook list`

```
Usage: pjr playbook list [options]

See status.

Options:
  -a --active         Status includes activity.
  -l --location       Status includes location.
  -p --templatesPath  Status includes templatesPath.
  -t --token          Status includes whether the playbook has an associated token.
  -v --verbose        Status includes everything.
  -h, --help          display help for command
```
## `pjr playbook remove`

```
Usage: pjr playbook remove [options]

Remove a playbook.

Options:
  -p, --playbook <playbook>  The name of the playbook to remove.
                             Can be provided interactively by user if not available
  -h, --help                 display help for command
```
## `pjr playbook select`

```
Usage: pjr playbook select [options]

Select a playbook.

Options:
  -e, --exclusive <exclusive>  If true, deselects other playbooks before selecting this one.
                               Can be provided interactively by user if not available
  -p, --playbook <playbook>    The name of the playbook to select.
                               Can be provided interactively by user if not available
  -h, --help                   display help for command
```
## `pjr playbook status`

```
Usage: pjr playbook status [options]

Check the status of playbooks.

Options:
  -a --active         Status includes activity.
  -l --location       Status includes location.
  -p --templatesPath  Status includes templatesPath.
  -t --token          Status includes whether the playbook has an associated token.
  -v --verbose        Status includes everything.
  -h, --help          display help for command
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
  -h, --help  display help for command

Commands:
  create      Create Sprints in Projects
```
## `pjr project sprints create`

```
Usage: pjr project sprints create [options]

Create Sprints in Projects

Options:
  -h, --help  display help for command
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
  -a --all <all>                 Deploy all templates (default: false)
  -t --templates [templates...]  Which templates to deploy
  -h, --help                     display help for command
```
## `pjr project template import`

```
Usage: pjr project template import [options]

Project Template Import

Options:
  -d, --directory <directory>  Directory to write to, which will be created if it does not exist.
                               Can be provided interactively by user if not available
  -f, --format <format>        Format to save the file in
                               Can be provided interactively by user if not available
                               Options: (.json, .yml)
  -h, --help                   display help for command
```
## `pjr version`

```
Usage: pjr version [options]

Print current projector version

Options:
  -h, --help  display help for command
```