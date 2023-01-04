const tsconfig = require("../tsconfig.documentation.json");
require("ts-node").register(tsconfig);
const { default: config } = require("./babel.config.ts");

module.exports = config;
