import { resolve } from "path";

const getHaxeLoader = () => {
  return {
    test: /\.hxml$/,
    use: [
      {
        loader: "cache-loader",
        options: {
          cacheDirectory: resolve(".webpackCache"),
        },
      },
      "haxe-loader",
    ],
  };
};

export default getHaxeLoader;
