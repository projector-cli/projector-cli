#!/usr/bin/env node
import { config } from "dotenv";
import { FileConstants } from "./constants";
config({
  path: FileConstants.envFileName,
});

import { join } from "path";
process.env.NODE_CONFIG_DIR = join(__dirname, "config");

import { pjrCommandFactory } from "./commands";
pjrCommandFactory().parse(process.argv);
