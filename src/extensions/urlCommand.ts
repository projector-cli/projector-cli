import { Command } from "./command";
import open from "open";
import { Link } from "../models/general/link";
import { ServiceCollection } from "../models";

/**
 * Create command to open URL in browser
 *
 * @param {Link} link Link
 * @param {string|undefined} path Path after base URL
 * @param {ServiceCollection} serviceCollection Service collection - creates one if not provided
 * @returns {Command} Command to open url in broswer
 */
export function urlCommand(link: Link, path?: string, serviceCollection?: ServiceCollection): Command {
  const { name, description, url } = link;
  return new Command()
    .name(name)
    .description(description)
    .setServiceCollection(serviceCollection)
    .addAction(async () => {
      await open(`${url}${path ? path : ""}`);
    });
}
