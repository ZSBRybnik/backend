import { join, resolve } from "path";
import source from "~backend/source/scripts/build/constants/source/source";

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
      {
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/env",
              {
                bugfixes: true,
                useBuiltIns: "usage",
                corejs: "3",
              },
            ],
            "@babel/preset-typescript",
            [
              "@babel/preset-react",
              {
                runtime: "automatic",
              },
            ],
          ],
          plugins: [
            "universal-import",
            "vuera/babel",
            "inline-react-svg",
            "@emotion",
          ],
        },
      },
      {
        loader: "ts-loader",
        options: {
          configFile: join(process.cwd(), "tsconfig.webpack.json"),
        },
      },
    ],
  };
};

export default getTypeScriptLoader;
