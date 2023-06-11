import { isUndefined, omitBy } from "lodash";
import path from "path";
import { Configuration } from "webpack";
import source from "~backend/source/scripts/build/constants/source/source";
import { GetConfigArguments } from "../../root/getConfig/getConfig";
import ExtendedMode from "../../types/extendedMode/extendedMode";

type GetEntryPointArguments = Pick<GetConfigArguments, "extendedMode">;

const getEntryPoint = ({
  extendedMode,
}: GetEntryPointArguments): Configuration["entry"] => {
  const serverEntryPoint = path.join(
    process.cwd(),
    source,
    "server",
    "index.ts",
  );
  return omitBy(
    {
      index: serverEntryPoint,
      handler:
        extendedMode === ExtendedMode.Serverless
          ? path.join(process.cwd(), source, "lambda", "handler.ts")
          : undefined,
    },
    isUndefined,
  ) as Record<string, string>;
};

export default getEntryPoint;
