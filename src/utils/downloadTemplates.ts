import { FileConstants, MetricNames } from "../constants";
import { InputService, Logger, Metrics } from "../models";

/**
 * Downloads a list of templates.
 *
 * @callback saveTemplate
 * @typedef T The type of template to download.
 * @param {() => Promise<T[]>} getTemplates A DI'd function which gets templates.
 * @param {saveTemplate} saveTemplate A DI'd function which saves templates.
 * @param {InputService} inputService User input service
 * @param {Logger} logger Logger
 * @param {Metrics|undefined} metrics Metrics
 * @param {string?} templateNameOption The optional file name to save the template to.
 * @param {string?} outputPathOption The optional path to save the template to.
 * @returns {Promise<void>} A Promise to download the template.
 */
export async function downloadTemplates<T extends { name: string }>(
  getTemplates: () => Promise<T[]>,
  saveTemplate: (ouputFileName: string, template: T) => Promise<void>,
  inputService: InputService,
  logger: Logger,
  metrics?: Metrics,
  templateNameOption?: string,
  outputPathOption?: string,
): Promise<void> {
  const templates = await getTemplates();
  const downloadTemplate = async (templateName?: string, outPath?: string): Promise<void> => {
    templateName =
      templateName ||
      (await inputService.multiChoiceQuestion(
        "Which template would you like?",
        templates.map((t) => t.name),
      ));

    if (!templateName) {
      throw new Error("Need a template name");
    }

    const template = templates.find((item) => item.name === templateName);

    if (!template) {
      throw new Error(
        `Couldn't find template '${templateName}'. Available templates:\n${templates
          .map((temp) => temp.name)
          .join("\n")}`,
      );
    }

    metrics?.increment(MetricNames.TemplateDownload, {
      templateName,
    });

    const outputFileName = await inputService.askQuestion(
      "Where would you like to initialize the template?",
      outPath || templateName + FileConstants.defaultConfigurationExtension,
    );
    logger.log(`Downloading ${templateName} template to ${outputFileName}...`);
    await saveTemplate(outputFileName, template);
    logger.log("Success");
  };

  if (templateNameOption) {
    return downloadTemplate(templateNameOption, outputPathOption);
  }

  do {
    await downloadTemplate(templateNameOption, outputPathOption);
  } while (await inputService.confirmAction("Would you like to initialize another template?"));
}
