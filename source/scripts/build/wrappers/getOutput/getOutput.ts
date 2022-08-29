import { join } from "path";
import destination from "~backend/source/scripts/build/constants/destination/destination";

const getOutputPublicPath = () => {
  return "/source/";
};

const getOutput = () => {
  return {
    path: join(process.cwd(), destination, "source"),
    publicPath: getOutputPublicPath(),
    filename: "index.js",
  };
};

export default getOutput;
