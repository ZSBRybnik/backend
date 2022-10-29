import { join } from "path";
import { Configuration } from "webpack";
import destination from "~backend/source/scripts/build/constants/destination/destination";
import ExtendedMode from "../../types/extendedMode/extendedMode";

type GetOutputArguments = {
  extendedMode: ExtendedMode;
};

const getOutputPublicPath = () => {
  return "/source/";
};

const getOutput = ({
  extendedMode,
}: GetOutputArguments): Configuration["output"] => {
  return {
    path: join(process.cwd(), destination, "source"),
    publicPath: getOutputPublicPath(),
    filename: "index.js",
    libraryTarget:
      extendedMode === ExtendedMode.Serverless ? "commonjs2" : undefined,
    library: extendedMode === ExtendedMode.Serverless ? "zsbrybnik" : undefined,
  };
};

export default getOutput;
