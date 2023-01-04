import { resolve } from "path";

const getPureScriptLoader = () => {
  return {
    test: /\.purs$/,
    use: [
      {
        loader: "cache-loader",
        options: {
          cacheDirectory: resolve(".webpackCache"),
        },
      },
      "purs-loader",
    ],
    exclude: /node_modules/,
  };
};

export default getPureScriptLoader;
