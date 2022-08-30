import { Config } from "@jest/types";
import { join } from "path";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "~backend/tsconfig.json";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  testTimeout: 100_000_000,
  setupFilesAfterEnv: ["jest-extended"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: join(process.cwd(), "."),
  }),
};

export default config;
