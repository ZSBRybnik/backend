//import LicensePlugin from "webpack-license-plugin";
import ExtendedMode from "~backend/source/scripts/build/types/extendedMode/extendedMode";

//import getTargetToModernFolder from "~backend/source/scripts/build/utils/getTargetToModernFolder/getTargetToModernFolder";

type GetLicensePluginArguments = {
  targetToModern: boolean;
  extendedMode: ExtendedMode;
};

// eslint-disable-next-line no-empty-pattern
const getLicensePlugin = ({}: //targetToModern,
//extendedMode,
GetLicensePluginArguments) => {
  /*const targetToModernFolder = getTargetToModernFolder({
    targetToModern,
    extendedMode,
  });
  const targetToModernFolderWithFix = targetToModernFolder
    ? `${targetToModernFolder}-`
    : targetToModernFolder;
  const extraPathBack = extendedMode !== ExtendedMode.Mobile ? "../" : "";
  return new LicensePlugin({
    outputFilename: `../../${extraPathBack}bundle-analyzes/${extendedMode}-${targetToModernFolderWithFix}licenses.json`,
  });*/
  return;
};

export default getLicensePlugin;
