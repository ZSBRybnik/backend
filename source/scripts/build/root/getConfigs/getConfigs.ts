import { Configuration } from "webpack";
import getConfig from "~scripts/build/root/getConfig/getConfig";
import ExtendedMode from "~scripts/build/types/extendedMode/extendedMode";
import Mode from "~scripts/build/types/mode/mode";
import { TargetType } from "~shared/constants/target/target";

export type ConfigsMapper = {
  [key in TargetType]: Configuration[];
};

type GetConfingsArguments = {
  targetType: TargetType;
  mode: Mode;
};

type GetConfings = (argument: GetConfingsArguments) => Configuration[];

const getConfings: GetConfings = ({
  targetType,
  mode,
}: GetConfingsArguments): Configuration[] => {
  const configs: ConfigsMapper = {
    [TargetType.Web]: [
      getConfig({
        mode,
        targetToModern: true,
        extendedMode: ExtendedMode.Web,
      }),
      getConfig({
        mode,
        targetToModern: false,
        extendedMode: ExtendedMode.Web,
      }),
    ],
    [TargetType.Desktop]: [
      getConfig({
        mode,
        targetToModern: true,
        extendedMode: ExtendedMode.Main,
      }),
      getConfig({
        mode,
        targetToModern: true,
        extendedMode: ExtendedMode.Renderer,
      }),
      getConfig({
        mode,
        targetToModern: true,
        extendedMode: ExtendedMode.Preload,
      }),
    ],
    [TargetType.Mobile]: [
      getConfig({
        mode,
        targetToModern: true,
        extendedMode: ExtendedMode.Mobile,
      }),
    ],
    [TargetType.OSFree]: [
      getConfig({
        mode,
        targetToModern: true,
        extendedMode: ExtendedMode.Main,
      }),
      getConfig({
        mode,
        targetToModern: true,
        extendedMode: ExtendedMode.Renderer,
      }),
      getConfig({
        mode,
        targetToModern: true,
        extendedMode: ExtendedMode.Preload,
      }),
    ],
  };
  return configs[targetType];
};

export default getConfings;
