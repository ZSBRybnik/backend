import { resolve } from "path";

const getNimLoader = () => {
  return {
    test: /\.nim$/,
    use: [
      {
        loader: "cache-loader",
        options: {
          cacheDirectory: resolve(".webpackCache"),
        },
      },
      "nim-loader",
    ],
  };
};

export default getNimLoader;
