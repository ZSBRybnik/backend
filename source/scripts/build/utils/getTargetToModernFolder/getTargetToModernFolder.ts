import ExtendedMode from "~scripts/build/types/extendedMode/extendedMode";

type GetTargetToModernFolderArguments = {
  targetToModern: boolean;
  extendedMode: ExtendedMode;
};

export enum TargetToModernFolder {
  Modern = "modern",
  Legacy = "legacy",
}

const getTargetToModernFolder = ({
  targetToModern,
  extendedMode,
}: GetTargetToModernFolderArguments) => {
  if (extendedMode === ExtendedMode.Web) {
    return targetToModern
      ? TargetToModernFolder.Modern
      : TargetToModernFolder.Legacy;
  } else {
    return "";
  }
};

export default getTargetToModernFolder;
