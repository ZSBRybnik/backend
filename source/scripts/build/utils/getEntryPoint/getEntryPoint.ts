import { upperFirst } from "lodash";
import path from "path";
import source from "~scripts/build/constants/source/source";
import ExtendedMode from "~scripts/build/types/extendedMode/extendedMode";

type GetEntryPointArguments = {
  extendedMode: ExtendedMode;
};

export enum AdditionalPath {
  Renderer = "renderer",
  Main = "main",
  Preload = "preload",
  Web = "renderer",
  Mobile = "renderer",
}

const getEntryPoint = ({ extendedMode }: GetEntryPointArguments): string => {
  const ex = upperFirst(extendedMode);
  const additionalPath =
    AdditionalPath[ex as keyof typeof AdditionalPath] || "";
  return path.join(process.cwd(), source, additionalPath, "index.ts");
};

export default getEntryPoint;
