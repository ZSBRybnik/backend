import { join, resolve } from "path";
import source from "~backend/source/scripts/build/constants/source/source";
import getBabelLoader from "../../subloaders/getBabelLoader/getBabelLoader";

const getTypeScriptLoader = () => {
  return {
    test: /\.(ts|tsx|js|jsx)$/,
    include: [
      join(process.cwd(), source),
      join(process.cwd(), "..", "frontend"),
    ],
    exclude: /(node_modules)/,
    use: [
      {
        loader: "cache-loader",
        options: {
          cacheDirectory: resolve(".webpackCache"),
        },
      },
      getBabelLoader(),
      /*{
        loader: "ts-loader",
        options: {
          configFile: join(process.cwd(), "tsconfig.json"),
        },
      },*/
    ],
  };
};

export default getTypeScriptLoader;
