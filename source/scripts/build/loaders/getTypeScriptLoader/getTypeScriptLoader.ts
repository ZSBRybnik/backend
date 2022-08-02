import { join } from "path";
import source from "~scripts/build/constants/source/source";

const getTypeScriptLoader = () => {
  return {
    test: /\.(ts|tsx|js|jsx)$/,
    include: join(process.cwd(), source),
    exclude: /(node_modules)/,
    use: [
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
        },
      },
      {
        loader: "ts-loader",
        options: {
          compiler: "ttypescript",
        },
      },
    ],
  };
};

export default getTypeScriptLoader;
