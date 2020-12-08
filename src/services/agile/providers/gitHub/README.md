# GitHub Agile Service Provider

GitHub's model for task management is different from the more "hierarchical" models used by many platforms.
The main grouping mechanisms are *label*, *project* and *milestone*.
Here are the ways we are mapping to those models in this project:

## Model Mapping

| Projector | GitHub    |
| :-------- | :-------- |
| Epic      | Label     |
| Feature   | Project   |
| Story     | Issue     |
| Task      | *Issue    |
| Bug       | *Issue    |
| Sprint    | Milestone |

> \* If a task/bug are children of a story, they will be included as checklists in the body of the story's issue.

## Still Pending

The `project` operations are still not implemented.
We should have a discussion on what "project" means in the context of GitHub since mostly everything is done at the repo level.
