import getBundleAnalyzerPlugin from "~scripts/build/plugins/getBundleAnalyzerPlugin/getBundleAnalyzerPlugin";
import getCleanWebpackPlugin from "~scripts/build/plugins/getCleanWebpackPlugin/getCleanWebpackPlugin";
import getCopyWebpackPlugin from "~scripts/build/plugins/getCopyWebpackPlugin/getCopyWebpackPlugin";
import getDefinePlugin from "~scripts/build/plugins/getDefinePlugin/getDefinePlugin";
import getDuplicatePackageCheckerPlugin from "~scripts/build/plugins/getDuplicatePackageCheckerPlugin/getDuplicatePackageCheckerPlugin";
import getESLintPlugin from "~scripts/build/plugins/getEslintPlugin/getEslintPlugin";
import getJsonMinimizerPlugin from "~scripts/build/plugins/getJsonMinimizerPlugin/getJsonMinimizerPlugin";
import getLicensePlugin from "~scripts/build/plugins/getLicensePlugin/getLicensePlugin";
import getUnusedWebpackPlugin from "~scripts/build/plugins/getUnusedWebpackPlugin/getUnusedWebpackPlugin";
import ExtendedMode from "~scripts/build/types/extendedMode/extendedMode";
import Mode from "~scripts/build/types/mode/mode";

type GetPluginsArguments = {
  targetToModern: boolean;
  mode: Mode;
  extendedMode: ExtendedMode;
};

const getPlugins = ({
  targetToModern,
  mode,
  extendedMode,
}: GetPluginsArguments) => {
  return [
    getUnusedWebpackPlugin(),
    getDuplicatePackageCheckerPlugin(),
    getDefinePlugin({
      publicURL: "public",
      targetToModern,
      mode,
    }),
    getCleanWebpackPlugin(),
    getESLintPlugin(),
    getJsonMinimizerPlugin(),
    getBundleAnalyzerPlugin({
      extendedMode,
    }),
    getLicensePlugin({ targetToModern, extendedMode }),
    getCopyWebpackPlugin(),
  ].filter(Boolean);
};

export default getPlugins;
