import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ExtendedMode from "~scripts/build/types/extendedMode/extendedMode";
import getTargetToModernFolder from "~scripts/build/utils/getTargetToModernFolder/getTargetToModernFolder";

type GetBundleAnalyzerPluginArguments = {
  targetToModern: boolean;
  extendedMode: ExtendedMode;
};

type GetBundleAnalyzerPlugin = (
  argument: GetBundleAnalyzerPluginArguments,
) => BundleAnalyzerPlugin;

const getBundleAnalyzerPlugin: GetBundleAnalyzerPlugin = ({
  targetToModern,
  extendedMode,
}: GetBundleAnalyzerPluginArguments): BundleAnalyzerPlugin => {
  const targetToModernFolder: string = getTargetToModernFolder({
    targetToModern,
    extendedMode,
  });
  const targetToModernFolderWithFix: string = targetToModernFolder
    ? `${targetToModernFolder}-`
    : targetToModernFolder;
  const extraPathBack: string =
    extendedMode !== ExtendedMode.Mobile ? "../" : "";
  return new BundleAnalyzerPlugin({
    openAnalyzer: false,
    analyzerMode: "static",
    reportFilename: `../../${extraPathBack}bundle-analyzes/${extendedMode}-${targetToModernFolderWithFix}analyzer-report.html`,
  });
};

export default getBundleAnalyzerPlugin;
