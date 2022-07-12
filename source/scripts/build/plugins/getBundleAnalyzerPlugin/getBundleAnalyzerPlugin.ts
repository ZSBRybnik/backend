import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ExtendedMode from "~scripts/build/types/extendedMode/extendedMode";

type GetBundleAnalyzerPluginArguments = {
  extendedMode: ExtendedMode;
};

type GetBundleAnalyzerPlugin = (
  argument: GetBundleAnalyzerPluginArguments,
) => BundleAnalyzerPlugin;

const getBundleAnalyzerPlugin: GetBundleAnalyzerPlugin = ({
  extendedMode,
}: GetBundleAnalyzerPluginArguments): BundleAnalyzerPlugin => {
  return new BundleAnalyzerPlugin({
    openAnalyzer: false,
    analyzerMode: "static",
    reportFilename: `../../bundle-analyzes/${extendedMode}-analyzer-report.html`,
  });
};

export default getBundleAnalyzerPlugin;
