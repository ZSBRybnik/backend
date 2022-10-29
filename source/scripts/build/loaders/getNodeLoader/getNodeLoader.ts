import { resolve } from "path";

const getNodeLoader = () => {
  return {
    test: /\.node$/,
    use: [
      {
        loader: "cache-loader",
        options: {
          cacheDirectory: resolve(".webpackCache"),
        },
      },
      "node-loader",
    ],
  };
};

export default getNodeLoader;
