import { join } from "path";
import source from "~scripts/build/constants/source/source";
import Mode from "~scripts/build/types/mode/mode";
import getTargetVersion from "~scripts/build/utils/getTargetVersion/getTargetVersion";

type GetTypeScriptLoaderArguments = {
  targetToModern: boolean;
  mode: Mode;
};

const getTypeScriptLoader = ({
  targetToModern,
  mode,
}: GetTypeScriptLoaderArguments) => {
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
                targets: getTargetVersion({ targetToModern }),
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
            "@emotion",
            targetToModern &&
              mode === "development" &&
              require.resolve("react-refresh/babel"),
          ].filter(Boolean),
        },
      },
    ],
  };
};

export default getTypeScriptLoader;
