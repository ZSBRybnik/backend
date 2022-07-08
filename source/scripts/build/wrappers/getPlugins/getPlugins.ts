import getBrotliCompressionPlugin from "~scripts/build/plugins/getBrotliCompressionPlugin/getBrotliCompressionPlugin";
import getBundleAnalyzerPlugin from "~scripts/build/plugins/getBundleAnalyzerPlugin/getBundleAnalyzerPlugin";
import getCleanWebpackPlugin from "~scripts/build/plugins/getCleanWebpackPlugin/getCleanWebpackPlugin";
import getCopyWebpackPlugin from "~scripts/build/plugins/getCopyWebpackPlugin/getCopyWebpackPlugin";
import getDefinePlugin from "~scripts/build/plugins/getDefinePlugin/getDefinePlugin";
import getDuplicatePackageCheckerPlugin from "~scripts/build/plugins/getDuplicatePackageCheckerPlugin/getDuplicatePackageCheckerPlugin";
import getESLintPlugin from "~scripts/build/plugins/getEslintPlugin/getEslintPlugin";
import getGzipCompressionPlugin from "~scripts/build/plugins/getGzipCompressionPlugin/getGzipCompressionPlugin";
import getHotModuleReplacementPlugin from "~scripts/build/plugins/getHotModuleReplacementPlugin/getHotModuleReplacementPlugin";
import getHtmlWebpackPlugin from "~scripts/build/plugins/getHtmlWebpackPlugin/getHtmlWebpackPlugin";
import getHtmWebpackPlugin from "~scripts/build/plugins/getHtmWebpackPlugin/getHtmWebpackPlugin";
import getInterpolateHtmlPlugin from "~scripts/build/plugins/getInterpolateHtmlPlugin/getInterpolateHtmlPlugin";
import getJsonMinimizerPlugin from "~scripts/build/plugins/getJsonMinimizerPlugin/getJsonMinimizerPlugin";
import getLicensePlugin from "~scripts/build/plugins/getLicensePlugin/getLicensePlugin";
import getNodePolyfillPlugin from "~scripts/build/plugins/getNodePolyfillPlugin/getNodePolyfillPlugin";
import getPreloadWebpackPlugin from "~scripts/build/plugins/getPreloadWebpackPlugin/getPreloadWebpackPlugin";
import getProvidePlugin from "~scripts/build/plugins/getProvidePlugin/getProvidePlugin";
import getReactRefreshWebpackPlugin from "~scripts/build/plugins/getReactRefreshWebpackPlugin/getReactRefreshWebpackPlugin";
import getRobotTxtPlugin from "~scripts/build/plugins/getRobotsTxtPlugin/getRobotsTxtPlugin";
import getScriptExtensionHtmlWebpackPlugin from "~scripts/build/plugins/getScriptExtensionHtmlWebpackPlugin/getScriptExtensionHtmlWebpackPlugin";
import getSitemapPlugin from "~scripts/build/plugins/getSitemapPlugin/getSitemapPlugin";
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
    getProvidePlugin({ extendedMode }),
    getUnusedWebpackPlugin({ extendedMode }),
    getDuplicatePackageCheckerPlugin(),
    getInterpolateHtmlPlugin(),
    getScriptExtensionHtmlWebpackPlugin(),
    getDefinePlugin({
      publicURL: "public",
      targetToModern,
      mode,
    }),
    getReactRefreshWebpackPlugin({ mode, targetToModern }),
    getCleanWebpackPlugin(),
    getBrotliCompressionPlugin({ targetToModern, extendedMode }),
    getGzipCompressionPlugin({ targetToModern, extendedMode }),
    getPreloadWebpackPlugin({ targetToModern }),
    getHtmlWebpackPlugin({ mode, extendedMode, targetToModern }),
    getHtmWebpackPlugin({ mode, extendedMode, targetToModern }),
    getESLintPlugin(),
    getJsonMinimizerPlugin(),
    getBundleAnalyzerPlugin({
      targetToModern,
      extendedMode,
    }),
    getRobotTxtPlugin({ targetToModern, extendedMode }),
    getLicensePlugin({ targetToModern, extendedMode }),
    getNodePolyfillPlugin(),
    getSitemapPlugin({ extendedMode }),
    getCopyWebpackPlugin({ extendedMode }),
    getHotModuleReplacementPlugin({ mode }),
  ].filter(Boolean);
};

export default getPlugins;
