import { join } from "path";
import { writeFile } from "fs/promises";
process.env.NODE_CONFIG_DIR = join(__dirname, "..", "config");
import { ConsoleLogger } from "../services";
import { InquirerInputService } from "../services/input/inquirerInputService";
import { InputService } from "../models";

/**
 * Get the base URL for the Azure DevOps organization
 *
 * @param {InputService} inputService User Input Service
 * @returns {Promise<string>} Base URL
 */
async function getBaseUrl(inputService: InputService): Promise<string> {
  return inputService.askQuestion("What is your Azure DevOps test instance base url?");
}

/**
 * Get the name for the Azure DevOps project
 *
 * @param {InputService} inputService User Input Service
 * @returns {Promise<string>} Project name
 */
async function getProjectName(inputService: InputService): Promise<string> {
  return inputService.askQuestion("What is your Azure DevOps test project name? (Must be Agile-enabled)");
}

/**
 * Get the access token for the Azure DevOps instance
 *
 * @param {InputService} inputService User Input Service
 * @param {string} baseUrl Base URL for Azure DevOps
 * @returns {Promise<string>} Access token
 */
async function getAzDOToken(inputService: InputService, baseUrl: string): Promise<string> {
  return inputService.askQuestion(
    `Please provide an Azure DevOps access token. Go to ${baseUrl}/_userSettings/tokens to create one`,
  );
}

/**
 * Get the GitHub personal access token
 *
 * @param {InputService} inputService User Input Service
 * @returns {Promise<string>} Access token
 */
async function getGitHubToken(inputService: InputService): Promise<string> {
  return inputService.askQuestion(
    "Please provide a GitHub access token. Go to https://github.com/settings/tokens to create one",
  );
}

/**
 * Creates a .env file in the current working directory
 */
async function createDotenvFile() {
  const logger = new ConsoleLogger();
  const inputService = new InquirerInputService(logger);

  logger.log(
    [
      "This script will generate your local .env file required for running tests",
      "Without it, the integration tests will fail\n",
    ].join("\n"),
  );
  const baseUrl = await getBaseUrl(inputService);
  const projectName = await getProjectName(inputService);
  const azdoToken = await getAzDOToken(inputService, baseUrl);
  const githubToken = await getGitHubToken(inputService);

  const dotenvContent = [
    `GITHUB_TOKEN=${githubToken}`,
    `AZURE_DEVOPS_PROJECT_NAME=${projectName}`,
    `AZURE_DEVOPS_BASE_URL=${baseUrl}`,
    `AZURE_DEVOPS_ACCESS_TOKEN=${azdoToken}`,
  ].join("\n");
  logger.log(`\n\n.env content:\n\n${dotenvContent}`);
  await writeFile(".env", dotenvContent);
}

createDotenvFile();
