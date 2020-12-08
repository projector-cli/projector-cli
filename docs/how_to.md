# How To

## Initialize projector

In order to initialize your local machine to use projector, you first need the values shown below depending on the provider you choose to use.
Then you will run [`pjr project init`](./commands.md#pjr-project-init).
This command puts your values into a `projector.json` file that will be used as a configuration file when initializing your agile provider.

### What you need

- **`providerName`** - Agile provider (currently only supports and defaults to `azdo`) (default: `azdo`)
- **`baseUrl`** - The base URL for your Azure DevOps organization.
This usually has the format `https://dev.azure.com/{organizationName}`.
  If you are unsure how to create an organization, follow [these guidelines](https://docs.microsoft.com/en-us/azure/devops/organizations/accounts/create-organization?view=azure-devops).
- **`accessToken`** - A personal access token for your Azure DevOps organization.
Go to `https://dev.azure.com/{organization}/_usersSettings/tokens` to generate a token.
- **`projectName`** - Name of your Azure DevOps project.
projector does not currently support project creation, but will soon.
Currently must be an existing project.

### Example Configuration

```json
{
    "agile": {
        "providerName": "azdo",
        "providerOptions": {
            "baseUrl": "https://dev.azure.com/my-org-name/",
            "projectName": "my-test-project",
            "personalAccessToken": "azd0spa6tl08ksl1kea6unch0fn3mbe8san6l3tt3rs"
        },
        "sprints": {
            "startDate": "2021-1-13",
            "lengthOfSprintInDays": 5,
            "daysBetweenSprints": 2,
            "numberOfSprints": 10,
            "sprintIndexStart": 1
        }
    },
    "github": {
        "personalAccessToken": "{Not required, but allows for greater API limit when reading from GitHub repos}"
    }
}
```

## Create a project

### Azure DevOps

TODO: Update [22359](https://dev.azure.com/dwrdev/projector/_workitems/edit/22359)

## Create a git repository

### Azure DevOps

TODO: Update [22359](https://dev.azure.com/dwrdev/projector/_workitems/edit/22359)

### GitHub

TODO: Update [22359](https://dev.azure.com/dwrdev/projector/_workitems/edit/22359)

## Create a backlog

When building out a backlog, Projector supports creating sprints and creating work items.

### Azure DevOps

#### Creating Sprints

In order to create sprints, the user should run [`pjr agile sprints create`](./commands.md#pjr-agile-sprints-create).

### JIRA

TODO: Update [22359](https://dev.azure.com/dwrdev/projector/_workitems/edit/22359)
