import { Configuration, WebpackPluginInstance } from "webpack";
import ExtendedMode from "~scripts/build/types/extendedMode/extendedMode";
import Mode from "~scripts/build/types/mode/mode";
import getEntryPoint from "~scripts/build/utils/getEntryPoint/getEntryPoint";
import getTarget from "~scripts/build/utils/getTarget/getTarget";
import getExperiments from "~scripts/build/wrappers/getExperiments/getExperiments";
import getExternals from "~scripts/build/wrappers/getExternals/getExternals";
import getLoaders from "~scripts/build/wrappers/getLoaders/getLoaders";
import getNode from "~scripts/build/wrappers/getNode/getNode";
import getOptimization from "~scripts/build/wrappers/getOptimization/getOptimization";
import getOutput from "~scripts/build/wrappers/getOutput/getOutput";
import getPlugins from "~scripts/build/wrappers/getPlugins/getPlugins";
import getResolve from "~scripts/build/wrappers/getResolve/getResolve";

type GetConfigArguments = {
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
    entry: getEntryPoint(),
    devtool: "source-map",
    target: getTarget(),
    optimization: getOptimization({ mode }),
    module: {
      rules: getLoaders(),
    },
    node: getNode(),
    externals: getExternals(),
    plugins: getPlugins({
      targetToModern,
      mode,
      extendedMode,
    }) as WebpackPluginInstance[],
    resolve: getResolve({ sourceFolder: "source" }),
    output: getOutput(),
    experiments: getExperiments(),
  };
};

export default getConfig;
