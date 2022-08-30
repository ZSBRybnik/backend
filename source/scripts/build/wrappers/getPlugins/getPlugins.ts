import getBundleAnalyzerPlugin from "~backend/source/scripts/build/plugins/getBundleAnalyzerPlugin/getBundleAnalyzerPlugin";
import getCleanWebpackPlugin from "~backend/source/scripts/build/plugins/getCleanWebpackPlugin/getCleanWebpackPlugin";
import getCopyWebpackPlugin from "~backend/source/scripts/build/plugins/getCopyWebpackPlugin/getCopyWebpackPlugin";
import getDefinePlugin from "~backend/source/scripts/build/plugins/getDefinePlugin/getDefinePlugin";
import getDuplicatePackageCheckerPlugin from "~backend/source/scripts/build/plugins/getDuplicatePackageCheckerPlugin/getDuplicatePackageCheckerPlugin";
import getESLintPlugin from "~backend/source/scripts/build/plugins/getEslintPlugin/getEslintPlugin";
import getJsonMinimizerPlugin from "~backend/source/scripts/build/plugins/getJsonMinimizerPlugin/getJsonMinimizerPlugin";
import getLicensePlugin from "~backend/source/scripts/build/plugins/getLicensePlugin/getLicensePlugin";
import getUnusedWebpackPlugin from "~backend/source/scripts/build/plugins/getUnusedWebpackPlugin/getUnusedWebpackPlugin";
import ExtendedMode from "~backend/source/scripts/build/types/extendedMode/extendedMode";
import Mode from "~backend/source/scripts/build/types/mode/mode";

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
