import { Configuration, WebpackPluginInstance } from "webpack";
import ExtendedMode from "~backend/source/scripts/build/types/extendedMode/extendedMode";
import Mode from "~backend/source/scripts/build/types/mode/mode";
import getEntryPoint from "~backend/source/scripts/build/utils/getEntryPoint/getEntryPoint";
import getTarget from "~backend/source/scripts/build/utils/getTarget/getTarget";
import getExperiments from "~backend/source/scripts/build/wrappers/getExperiments/getExperiments";
import getExternals from "~backend/source/scripts/build/wrappers/getExternals/getExternals";
import getLoaders from "~backend/source/scripts/build/wrappers/getLoaders/getLoaders";
import getNode from "~backend/source/scripts/build/wrappers/getNode/getNode";
import getOptimization from "~backend/source/scripts/build/wrappers/getOptimization/getOptimization";
import getOutput from "~backend/source/scripts/build/wrappers/getOutput/getOutput";
import getPlugins from "~backend/source/scripts/build/wrappers/getPlugins/getPlugins";
import getResolve from "~backend/source/scripts/build/wrappers/getResolve/getResolve";

export type GetConfigArguments = {
  extendedMode: ExtendedMode;
  targetToModern: boolean;
  mode: Mode;
};

type GetConfig = (argument: GetConfigArguments) => Configuration;

const getConfig: GetConfig = ({
  extendedMode,
  targetToModern,
  mode,
}: GetConfigArguments): Configuration => {
  return {
    mode: mode === Mode.Development ? mode : Mode.Production,
    entry: getEntryPoint({ extendedMode }),
    devtool: "source-map",
    target: getTarget(),
    optimization: getOptimization({ mode }),
    module: {
      rules: getLoaders(),
    },
    node: getNode(),
    externals: getExternals() as any,
    plugins: getPlugins({
      targetToModern,
      mode,
      extendedMode,
    }) as WebpackPluginInstance[],
    resolve: getResolve({ sourceFolder: "source" }),
    output: getOutput({ extendedMode }),
    experiments: getExperiments(),
  };
};

export default getConfig;
