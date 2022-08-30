import { RuleSetRule } from "webpack";
import getCssLoader from "~backend/source/scripts/build/loaders/getCssLoader/getCssLoader";
import getJavaScriptModuleLoader from "~backend/source/scripts/build/loaders/getJavaScriptModuleLoader/getJavaScriptModuleLoader";
import getNodeLoader from "~backend/source/scripts/build/loaders/getNodeLoader/getNodeLoader";
import getPugLoader from "~backend/source/scripts/build/loaders/getPugLoader/getPugLoader";
import getSourceMapLoader from "~backend/source/scripts/build/loaders/getSourceMapLoader/getSourceMapLoader";
import getTypeScriptLoader from "~backend/source/scripts/build/loaders/getTypeScriptLoader/getTypeScriptLoader";

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
