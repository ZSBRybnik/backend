import { Configuration } from "webpack";
import getConfig from "~scripts/build/root/getConfig/getConfig";
import ExtendedMode from "~scripts/build/types/extendedMode/extendedMode";
import Mode from "~scripts/build/types/mode/mode";
import { TargetType } from "~shared/constants/TargetType";

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
    [TargetType.Server]: [
      getConfig({
        mode,
        targetToModern: true,
        extendedMode: ExtendedMode.Web,
      }),
    ],
  };
  return configs[targetType];
};

export default getConfings;
