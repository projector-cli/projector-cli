# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.34.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.34.0) (2021-06-29)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Add AppInsights logging and metrics ([68bcd90](https://dev.azure.com/dwrdev/_git/projector/commit/68bcd90a8df88d629c1481fceb22c72e9db71493)), closes [#22279](https://dev.azure.com///issues/22279)
* Add command path to default observability properties ([3d5d23c](https://dev.azure.com/dwrdev/_git/projector/commit/3d5d23c904fab8a925d1f385de03ddbf030bcc0a)), closes [#22333](https://dev.azure.com///issues/22333)
* Add default properties to logger and metrics ([48610a8](https://dev.azure.com/dwrdev/_git/projector/commit/48610a8a5309b4777472a7ce694effd32ae92c2f)), closes [#22332](https://dev.azure.com///issues/22332)
* Add template download metric ([b505d6c](https://dev.azure.com/dwrdev/_git/projector/commit/b505d6c823a01affa2d7de1ea8d4ba6cba16244c)), closes [#22351](https://dev.azure.com///issues/22351) [#22352](https://dev.azure.com///issues/22352) [#22351](https://dev.azure.com///issues/22351) [#22352](https://dev.azure.com///issues/22352)
* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))
* Support for yaml and small fixes ([fbd6d21](https://dev.azure.com/dwrdev/_git/projector/commit/fbd6d218db90a29b2506dcfc96dbe9cec0a2e157))


### Bug Fixes

* Adds ds_store to gitignore ([49e4304](https://dev.azure.com/dwrdev/_git/projector/commit/49e4304afeef458bb1cdce122db59f69d70262ce)), closes [#22408](https://dev.azure.com///issues/22408)
* Re-enable app insights by default and fix lag ([2872915](https://dev.azure.com/dwrdev/_git/projector/commit/287291525b410b5ec1e7f496084883b648aded8e)), closes [#22358](https://dev.azure.com///issues/22358) [#22371](https://dev.azure.com///issues/22371) [#22371](https://dev.azure.com///issues/22371)
* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://dev.azure.com///issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Temporarily turn off app insights by default ([99fe69a](https://dev.azure.com/dwrdev/_git/projector/commit/99fe69a4b4392e26cad356f73b12b8899966df13)), closes [#22358](https://dev.azure.com///issues/22358)
* Update .env.sample to correct names and values ([55a15bc](https://dev.azure.com/dwrdev/_git/projector/commit/55a15bc4663d42d96c4c495b387ec459607db131))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))

## [0.33.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.33.0) (2021-05-20)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Add AppInsights logging and metrics ([68bcd90](https://dev.azure.com/dwrdev/_git/projector/commit/68bcd90a8df88d629c1481fceb22c72e9db71493)), closes [#22279](https://dev.azure.com///issues/22279)
* Add command path to default observability properties ([3d5d23c](https://dev.azure.com/dwrdev/_git/projector/commit/3d5d23c904fab8a925d1f385de03ddbf030bcc0a)), closes [#22333](https://dev.azure.com///issues/22333)
* Add default properties to logger and metrics ([48610a8](https://dev.azure.com/dwrdev/_git/projector/commit/48610a8a5309b4777472a7ce694effd32ae92c2f)), closes [#22332](https://dev.azure.com///issues/22332)
* Add template download metric ([b505d6c](https://dev.azure.com/dwrdev/_git/projector/commit/b505d6c823a01affa2d7de1ea8d4ba6cba16244c)), closes [#22351](https://dev.azure.com///issues/22351) [#22352](https://dev.azure.com///issues/22352) [#22351](https://dev.azure.com///issues/22351) [#22352](https://dev.azure.com///issues/22352)
* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))
* Support for yaml and small fixes ([fbd6d21](https://dev.azure.com/dwrdev/_git/projector/commit/fbd6d218db90a29b2506dcfc96dbe9cec0a2e157))


### Bug Fixes

* Re-enable app insights by default and fix lag ([2872915](https://dev.azure.com/dwrdev/_git/projector/commit/287291525b410b5ec1e7f496084883b648aded8e)), closes [#22358](https://dev.azure.com///issues/22358) [#22371](https://dev.azure.com///issues/22371) [#22371](https://dev.azure.com///issues/22371)
* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://dev.azure.com///issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Temporarily turn off app insights by default ([99fe69a](https://dev.azure.com/dwrdev/_git/projector/commit/99fe69a4b4392e26cad356f73b12b8899966df13)), closes [#22358](https://dev.azure.com///issues/22358)
* Update .env.sample to correct names and values ([55a15bc](https://dev.azure.com/dwrdev/_git/projector/commit/55a15bc4663d42d96c4c495b387ec459607db131))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))

## [0.32.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.32.0) (2021-05-19)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Add AppInsights logging and metrics ([68bcd90](https://dev.azure.com/dwrdev/_git/projector/commit/68bcd90a8df88d629c1481fceb22c72e9db71493)), closes [#22279](https://dev.azure.com///issues/22279)
* Add command path to default observability properties ([3d5d23c](https://dev.azure.com/dwrdev/_git/projector/commit/3d5d23c904fab8a925d1f385de03ddbf030bcc0a)), closes [#22333](https://dev.azure.com///issues/22333)
* Add default properties to logger and metrics ([48610a8](https://dev.azure.com/dwrdev/_git/projector/commit/48610a8a5309b4777472a7ce694effd32ae92c2f)), closes [#22332](https://dev.azure.com///issues/22332)
* Add template download metric ([b505d6c](https://dev.azure.com/dwrdev/_git/projector/commit/b505d6c823a01affa2d7de1ea8d4ba6cba16244c)), closes [#22351](https://dev.azure.com///issues/22351) [#22352](https://dev.azure.com///issues/22352) [#22351](https://dev.azure.com///issues/22351) [#22352](https://dev.azure.com///issues/22352)
* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))
* Support for yaml and small fixes ([fbd6d21](https://dev.azure.com/dwrdev/_git/projector/commit/fbd6d218db90a29b2506dcfc96dbe9cec0a2e157))


### Bug Fixes

* Re-enable app insights by default and fix lag ([2872915](https://dev.azure.com/dwrdev/_git/projector/commit/287291525b410b5ec1e7f496084883b648aded8e)), closes [#22358](https://dev.azure.com///issues/22358) [#22371](https://dev.azure.com///issues/22371) [#22371](https://dev.azure.com///issues/22371)
* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://dev.azure.com///issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Temporarily turn off app insights by default ([99fe69a](https://dev.azure.com/dwrdev/_git/projector/commit/99fe69a4b4392e26cad356f73b12b8899966df13)), closes [#22358](https://dev.azure.com///issues/22358)
* Update .env.sample to correct names and values ([55a15bc](https://dev.azure.com/dwrdev/_git/projector/commit/55a15bc4663d42d96c4c495b387ec459607db131))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))

## [0.31.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.31.0) (2021-05-19)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Add AppInsights logging and metrics ([68bcd90](https://dev.azure.com/dwrdev/_git/projector/commit/68bcd90a8df88d629c1481fceb22c72e9db71493)), closes [#22279](https://dev.azure.com///issues/22279)
* Add command path to default observability properties ([3d5d23c](https://dev.azure.com/dwrdev/_git/projector/commit/3d5d23c904fab8a925d1f385de03ddbf030bcc0a)), closes [#22333](https://dev.azure.com///issues/22333)
* Add default properties to logger and metrics ([48610a8](https://dev.azure.com/dwrdev/_git/projector/commit/48610a8a5309b4777472a7ce694effd32ae92c2f)), closes [#22332](https://dev.azure.com///issues/22332)
* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))
* Support for yaml and small fixes ([fbd6d21](https://dev.azure.com/dwrdev/_git/projector/commit/fbd6d218db90a29b2506dcfc96dbe9cec0a2e157))


### Bug Fixes

* Re-enable app insights by default and fix lag ([2872915](https://dev.azure.com/dwrdev/_git/projector/commit/287291525b410b5ec1e7f496084883b648aded8e)), closes [#22358](https://dev.azure.com///issues/22358) [#22371](https://dev.azure.com///issues/22371) [#22371](https://dev.azure.com///issues/22371)
* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://dev.azure.com///issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Temporarily turn off app insights by default ([99fe69a](https://dev.azure.com/dwrdev/_git/projector/commit/99fe69a4b4392e26cad356f73b12b8899966df13)), closes [#22358](https://dev.azure.com///issues/22358)
* Update .env.sample to correct names and values ([55a15bc](https://dev.azure.com/dwrdev/_git/projector/commit/55a15bc4663d42d96c4c495b387ec459607db131))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))

## [0.30.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.30.0) (2021-05-19)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Add AppInsights logging and metrics ([68bcd90](https://dev.azure.com/dwrdev/_git/projector/commit/68bcd90a8df88d629c1481fceb22c72e9db71493)), closes [#22279](https://dev.azure.com///issues/22279)
* Add command path to default observability properties ([3d5d23c](https://dev.azure.com/dwrdev/_git/projector/commit/3d5d23c904fab8a925d1f385de03ddbf030bcc0a)), closes [#22333](https://dev.azure.com///issues/22333)
* Add default properties to logger and metrics ([48610a8](https://dev.azure.com/dwrdev/_git/projector/commit/48610a8a5309b4777472a7ce694effd32ae92c2f)), closes [#22332](https://dev.azure.com///issues/22332)
* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))
* Support for yaml and small fixes ([fbd6d21](https://dev.azure.com/dwrdev/_git/projector/commit/fbd6d218db90a29b2506dcfc96dbe9cec0a2e157))


### Bug Fixes

* Re-enable app insights by default and fix lag ([2872915](https://dev.azure.com/dwrdev/_git/projector/commit/287291525b410b5ec1e7f496084883b648aded8e)), closes [#22358](https://dev.azure.com///issues/22358) [#22371](https://dev.azure.com///issues/22371) [#22371](https://dev.azure.com///issues/22371)
* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://dev.azure.com///issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Temporarily turn off app insights by default ([99fe69a](https://dev.azure.com/dwrdev/_git/projector/commit/99fe69a4b4392e26cad356f73b12b8899966df13)), closes [#22358](https://dev.azure.com///issues/22358)
* Update .env.sample to correct names and values ([55a15bc](https://dev.azure.com/dwrdev/_git/projector/commit/55a15bc4663d42d96c4c495b387ec459607db131))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))

## [0.29.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.29.0) (2021-05-18)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Add AppInsights logging and metrics ([68bcd90](https://dev.azure.com/dwrdev/_git/projector/commit/68bcd90a8df88d629c1481fceb22c72e9db71493)), closes [#22279](https://github.com/projector-cli/projector/issues/22279)
* Add command path to default observability properties ([3d5d23c](https://dev.azure.com/dwrdev/_git/projector/commit/3d5d23c904fab8a925d1f385de03ddbf030bcc0a)), closes [#22333](https://github.com/projector-cli/projector/issues/22333)
* Add default properties to logger and metrics ([48610a8](https://dev.azure.com/dwrdev/_git/projector/commit/48610a8a5309b4777472a7ce694effd32ae92c2f)), closes [#22332](https://github.com/projector-cli/projector/issues/22332)
* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))
* Support for yaml and small fixes ([fbd6d21](https://dev.azure.com/dwrdev/_git/projector/commit/fbd6d218db90a29b2506dcfc96dbe9cec0a2e157))


### Bug Fixes

* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://github.com/projector-cli/projector/issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Temporarily turn off app insights by default ([99fe69a](https://dev.azure.com/dwrdev/_git/projector/commit/99fe69a4b4392e26cad356f73b12b8899966df13)), closes [#22358](https://github.com/projector-cli/projector/issues/22358)
* Update .env.sample to correct names and values ([55a15bc](https://dev.azure.com/dwrdev/_git/projector/commit/55a15bc4663d42d96c4c495b387ec459607db131))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))

## [0.28.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.28.0) (2021-05-18)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Add AppInsights logging and metrics ([68bcd90](https://dev.azure.com/dwrdev/_git/projector/commit/68bcd90a8df88d629c1481fceb22c72e9db71493)), closes [#22279](https://github.com/projector-cli/projector/issues/22279)
* Add command path to default observability properties ([3d5d23c](https://dev.azure.com/dwrdev/_git/projector/commit/3d5d23c904fab8a925d1f385de03ddbf030bcc0a)), closes [#22333](https://github.com/projector-cli/projector/issues/22333)
* Add default properties to logger and metrics ([48610a8](https://dev.azure.com/dwrdev/_git/projector/commit/48610a8a5309b4777472a7ce694effd32ae92c2f)), closes [#22332](https://github.com/projector-cli/projector/issues/22332)
* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))
* Support for yaml and small fixes ([fbd6d21](https://dev.azure.com/dwrdev/_git/projector/commit/fbd6d218db90a29b2506dcfc96dbe9cec0a2e157))


### Bug Fixes

* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://github.com/projector-cli/projector/issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Temporarily turn off app insights by default ([99fe69a](https://dev.azure.com/dwrdev/_git/projector/commit/99fe69a4b4392e26cad356f73b12b8899966df13)), closes [#22358](https://github.com/projector-cli/projector/issues/22358)
* Update .env.sample to correct names and values ([55a15bc](https://dev.azure.com/dwrdev/_git/projector/commit/55a15bc4663d42d96c4c495b387ec459607db131))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))

## [0.27.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.27.0) (2021-05-18)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Add AppInsights logging and metrics ([68bcd90](https://dev.azure.com/dwrdev/_git/projector/commit/68bcd90a8df88d629c1481fceb22c72e9db71493)), closes [#22279](https://github.com/projector-cli/projector/issues/22279)
* Add default properties to logger and metrics ([48610a8](https://dev.azure.com/dwrdev/_git/projector/commit/48610a8a5309b4777472a7ce694effd32ae92c2f)), closes [#22332](https://github.com/projector-cli/projector/issues/22332)
* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))
* Support for yaml and small fixes ([fbd6d21](https://dev.azure.com/dwrdev/_git/projector/commit/fbd6d218db90a29b2506dcfc96dbe9cec0a2e157))


### Bug Fixes

* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://github.com/projector-cli/projector/issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Temporarily turn off app insights by default ([99fe69a](https://dev.azure.com/dwrdev/_git/projector/commit/99fe69a4b4392e26cad356f73b12b8899966df13)), closes [#22358](https://github.com/projector-cli/projector/issues/22358)
* Update .env.sample to correct names and values ([55a15bc](https://dev.azure.com/dwrdev/_git/projector/commit/55a15bc4663d42d96c4c495b387ec459607db131))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))

## [0.26.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.26.0) (2021-05-18)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Add AppInsights logging and metrics ([68bcd90](https://dev.azure.com/dwrdev/_git/projector/commit/68bcd90a8df88d629c1481fceb22c72e9db71493)), closes [#22279](https://github.com/projector-cli/projector/issues/22279)
* Add default properties to logger and metrics ([48610a8](https://dev.azure.com/dwrdev/_git/projector/commit/48610a8a5309b4777472a7ce694effd32ae92c2f)), closes [#22332](https://github.com/projector-cli/projector/issues/22332)
* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))
* Support for yaml and small fixes ([fbd6d21](https://dev.azure.com/dwrdev/_git/projector/commit/fbd6d218db90a29b2506dcfc96dbe9cec0a2e157))


### Bug Fixes

* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://github.com/projector-cli/projector/issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Update .env.sample to correct names and values ([55a15bc](https://dev.azure.com/dwrdev/_git/projector/commit/55a15bc4663d42d96c4c495b387ec459607db131))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))

## [0.25.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.25.0) (2021-05-18)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Add AppInsights logging and metrics ([68bcd90](https://dev.azure.com/dwrdev/_git/projector/commit/68bcd90a8df88d629c1481fceb22c72e9db71493)), closes [#22279](https://github.com/projector-cli/projector/issues/22279)
* Add default properties to logger and metrics ([48610a8](https://dev.azure.com/dwrdev/_git/projector/commit/48610a8a5309b4777472a7ce694effd32ae92c2f)), closes [#22332](https://github.com/projector-cli/projector/issues/22332)
* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))
* Support for yaml and small fixes ([fbd6d21](https://dev.azure.com/dwrdev/_git/projector/commit/fbd6d218db90a29b2506dcfc96dbe9cec0a2e157))


### Bug Fixes

* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://github.com/projector-cli/projector/issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Update .env.sample to correct names and values ([55a15bc](https://dev.azure.com/dwrdev/_git/projector/commit/55a15bc4663d42d96c4c495b387ec459607db131))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))

## [0.24.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.24.0) (2021-05-18)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Add AppInsights logging and metrics ([68bcd90](https://dev.azure.com/dwrdev/_git/projector/commit/68bcd90a8df88d629c1481fceb22c72e9db71493)), closes [#22279](https://github.com/projector-cli/projector/issues/22279)
* Add default properties to logger and metrics ([48610a8](https://dev.azure.com/dwrdev/_git/projector/commit/48610a8a5309b4777472a7ce694effd32ae92c2f)), closes [#22332](https://github.com/projector-cli/projector/issues/22332)
* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))
* Support for yaml and small fixes ([fbd6d21](https://dev.azure.com/dwrdev/_git/projector/commit/fbd6d218db90a29b2506dcfc96dbe9cec0a2e157))


### Bug Fixes

* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://github.com/projector-cli/projector/issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Update .env.sample to correct names and values ([55a15bc](https://dev.azure.com/dwrdev/_git/projector/commit/55a15bc4663d42d96c4c495b387ec459607db131))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))

## [0.23.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.23.0) (2021-05-17)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Add AppInsights logging and metrics ([68bcd90](https://dev.azure.com/dwrdev/_git/projector/commit/68bcd90a8df88d629c1481fceb22c72e9db71493)), closes [#22279](https://github.com/projector-cli/projector/issues/22279)
* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))
* Support for yaml and small fixes ([fbd6d21](https://dev.azure.com/dwrdev/_git/projector/commit/fbd6d218db90a29b2506dcfc96dbe9cec0a2e157))


### Bug Fixes

* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://github.com/projector-cli/projector/issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Update .env.sample to correct names and values ([55a15bc](https://dev.azure.com/dwrdev/_git/projector/commit/55a15bc4663d42d96c4c495b387ec459607db131))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))

## [0.22.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.22.0) (2021-05-17)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Add AppInsights logging and metrics ([68bcd90](https://dev.azure.com/dwrdev/_git/projector/commit/68bcd90a8df88d629c1481fceb22c72e9db71493)), closes [#22279](https://github.com/projector-cli/projector/issues/22279)
* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))
* Support for yaml and small fixes ([fbd6d21](https://dev.azure.com/dwrdev/_git/projector/commit/fbd6d218db90a29b2506dcfc96dbe9cec0a2e157))


### Bug Fixes

* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://github.com/projector-cli/projector/issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Update .env.sample to correct names and values ([55a15bc](https://dev.azure.com/dwrdev/_git/projector/commit/55a15bc4663d42d96c4c495b387ec459607db131))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))

## [0.21.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.21.0) (2021-05-17)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))
* Support for yaml and small fixes ([fbd6d21](https://dev.azure.com/dwrdev/_git/projector/commit/fbd6d218db90a29b2506dcfc96dbe9cec0a2e157))


### Bug Fixes

* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://github.com/projector-cli/projector/issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Update .env.sample to correct names and values ([55a15bc](https://dev.azure.com/dwrdev/_git/projector/commit/55a15bc4663d42d96c4c495b387ec459607db131))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))

## [0.18.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.18.0) (2021-05-13)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))
* Support for yaml and small fixes ([fbd6d21](https://dev.azure.com/dwrdev/_git/projector/commit/fbd6d218db90a29b2506dcfc96dbe9cec0a2e157))


### Bug Fixes

* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://github.com/projector-cli/projector/issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))

## [0.17.0](https://dev.azure.com/dwrdev/_git/projector/branchCompare?baseVersion=GTv0.12.14&targetVersion=GTv0.17.0) (2021-05-10)


### ⚠ BREAKING CHANGES

* This removes all references to a local configuration file

- Adds interactive arguments for agile and repo commands
- Adds command extensions for registering related service provider options
- Updates `ServiceCollection` to have agile, repo and playbook service provider getters rather than the services themselves. This allows for "lazy loading" of services and not initializing unnecessary services
- Adds simulated arguments for agile and repo commands
- Added generic type `TOptions` to `Command`, which specifies the type of CLI options available
- Removed the `config` commands since they only dealt with the `projector.json` configuration
- Normalized option names across the board
- Repo create command only creates one repo at a time, given in option
- Added more configuration in `custom-environment-variables.json` for testing platform-specific functionality
- Organized `ConfigKeys` by section
- Added decorated description to interactive options to included choices or option availability per platform
- Remove deprecated platform-specific models and options
- Updated tests and test utilities
- Updated environment variables for CI test run to reflect changes in `custom-environment-variables.json`

### Features

* Remove local configuration file ([d8fd121](https://dev.azure.com/dwrdev/_git/projector/commit/d8fd121f7e2b6ad77b2c8e999dac3abb408c5c33))


### Bug Fixes

* Remove changelog to reset changelog generation ([d3c88d9](https://dev.azure.com/dwrdev/_git/projector/commit/d3c88d96abbbe465dbc2345c689857ebd5eb72eb)), closes [#22268](https://github.com/projector-cli/projector/issues/22268)
* Remove deprecated configuration files ([d581acb](https://dev.azure.com/dwrdev/_git/projector/commit/d581acb51bcd445d159d7ebdceee94e2ba2b7536))
* Update tests to use GitHub configuration ([aa7af62](https://dev.azure.com/dwrdev/_git/projector/commit/aa7af6274b39774bcdcdbec1a35f6071547cf848))
* Use agile template type ID for newly created projects ([7b07607](https://dev.azure.com/dwrdev/_git/projector/commit/7b076073903303e8432389db5026a23e2e174779))
