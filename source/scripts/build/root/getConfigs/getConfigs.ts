import { Configuration } from "webpack";
import getConfig from "~backend/source/scripts/build/root/getConfig/getConfig";

import ExtendedMode from "~backend/source/scripts/build/types/extendedMode/extendedMode";

import Mode from "~backend/source/scripts/build/types/mode/mode";

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
  mode,
}: GetConfingsArguments): Configuration[] => {
  const configs: ConfigsMapper = {
    [TargetType.Server]: [
      getConfig({
        mode,
        targetToModern: true,
        extendedMode: ExtendedMode.Server,
      }),
    ],
  };
  return configs[TargetType.Server];
};

export default getConfings;
