import { resolve } from "path";

const getSourceMapLoader = () => {
  return {
    test: /\.(js)$/,
    enforce: "pre",
    exclude: /(node_modules)/,
    use: [
      {
        loader: "cache-loader",
        options: {
          cacheDirectory: resolve(".webpackCache"),
        },
      },
      "source-map-loader",
    ],
  };
};

export default getSourceMapLoader;
