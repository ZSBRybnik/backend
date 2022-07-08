import ExtendedMode from "~scripts/build/types/extendedMode/extendedMode";

type GetExtendedModeFolderArguments = {
  extendedMode: ExtendedMode;
};

const getExtendedModeFolder = ({
  extendedMode,
}: GetExtendedModeFolderArguments) => {
  if (extendedMode === ExtendedMode.Preload) {
    return ExtendedMode.Preload;
  } else if (extendedMode === ExtendedMode.Main) {
    return ExtendedMode.Main;
  } else if (extendedMode === ExtendedMode.Renderer) {
    return ExtendedMode.Renderer;
  } else {
    return "";
  }
};

export default getExtendedModeFolder;
