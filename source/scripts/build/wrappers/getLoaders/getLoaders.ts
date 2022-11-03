import { RuleSetRule } from "webpack";
import getCssLoader from "~backend/source/scripts/build/loaders/getCssLoader/getCssLoader";
import getHaxeLoader from "~backend/source/scripts/build/loaders/getHaxeLoader/getHaxeLoader";
import getJavaScriptModuleLoader from "~backend/source/scripts/build/loaders/getJavaScriptModuleLoader/getJavaScriptModuleLoader";
import getNimLoader from "~backend/source/scripts/build/loaders/getNimLoader/getNimLoader";
import getNodeLoader from "~backend/source/scripts/build/loaders/getNodeLoader/getNodeLoader";
import getPugLoader from "~backend/source/scripts/build/loaders/getPugLoader/getPugLoader";
import getPureScriptLoader from "~backend/source/scripts/build/loaders/getPureScriptLoader/getPureScriptLoader";
import getSourceMapLoader from "~backend/source/scripts/build/loaders/getSourceMapLoader/getSourceMapLoader";
import getSvelteLoader from "~backend/source/scripts/build/loaders/getSvelteLoader/getSvelteLoader";
import getTypeScriptLoader from "~backend/source/scripts/build/loaders/getTypeScriptLoader/getTypeScriptLoader";

type GetLoader = () => RuleSetRule[];

const getLoaders: GetLoader = (): RuleSetRule[] => {
  return [
    getSourceMapLoader(),
    getPugLoader(),
    getTypeScriptLoader(),
    getNodeLoader(),
    getJavaScriptModuleLoader(),
    getPureScriptLoader(),
    getCssLoader(),
    getHaxeLoader(),
    getNimLoader(),
    getSvelteLoader(),
  ];
};

export default getLoaders;
