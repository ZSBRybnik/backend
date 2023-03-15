const tsconfig = require("./tsconfig.json");
require("ts-node").register(tsconfig);
const { default: config } = require("./eslintrc.ts");

module.exports = config;
