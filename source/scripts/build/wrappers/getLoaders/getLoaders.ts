import { RuleSetRule } from "webpack";
import getCssLoader from "~scripts/build/loaders/getCssLoader/getCssLoader";
import getJavaScriptModuleLoader from "~scripts/build/loaders/getJavaScriptModuleLoader/getJavaScriptModuleLoader";
import getNodeLoader from "~scripts/build/loaders/getNodeLoader/getNodeLoader";
import getPugLoader from "~scripts/build/loaders/getPugLoader/getPugLoader";
import getSourceMapLoader from "~scripts/build/loaders/getSourceMapLoader/getSourceMapLoader";
import getTypeScriptLoader from "~scripts/build/loaders/getTypeScriptLoader/getTypeScriptLoader";
import Mode from "~scripts/build/types/mode/mode";

type GetLoaderArguments = {
  targetToModern: boolean;
  mode: Mode;
};

type GetLoader = (argument: GetLoaderArguments) => RuleSetRule[];

const getLoaders: GetLoader = ({
  targetToModern,
  mode,
}: GetLoaderArguments): RuleSetRule[] => {
  return [
    getSourceMapLoader(),
    getPugLoader(),
    getTypeScriptLoader({ targetToModern, mode }),
    getNodeLoader(),
    getJavaScriptModuleLoader(),
    getCssLoader(),
  ];
};

export default getLoaders;
