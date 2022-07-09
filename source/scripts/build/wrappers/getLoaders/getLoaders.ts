import { RuleSetRule } from "webpack";
import getCssLoader from "~scripts/build/loaders/getCssLoader/getCssLoader";
import getJavaScriptModuleLoader from "~scripts/build/loaders/getJavaScriptModuleLoader/getJavaScriptModuleLoader";
import getNodeLoader from "~scripts/build/loaders/getNodeLoader/getNodeLoader";
import getPugLoader from "~scripts/build/loaders/getPugLoader/getPugLoader";
import getSourceMapLoader from "~scripts/build/loaders/getSourceMapLoader/getSourceMapLoader";
import getTypeScriptLoader from "~scripts/build/loaders/getTypeScriptLoader/getTypeScriptLoader";

type GetLoader = () => RuleSetRule[];

const getLoaders: GetLoader = (): RuleSetRule[] => {
  return [
    getSourceMapLoader(),
    getPugLoader(),
    getTypeScriptLoader(),
    getNodeLoader(),
    getJavaScriptModuleLoader(),
    getCssLoader(),
  ];
};

export default getLoaders;
