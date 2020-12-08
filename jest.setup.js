const { join } = require("path");

process.env.NODE_CONFIG_DIR = join(__dirname, "src", "config");
