import { resolve } from "path";

const getPugLoader = () => {
  return {
    test: /\.pug$/,
    use: [
      {
        loader: "cache-loader",
        options: {
          cacheDirectory: resolve(".webpackCache"),
        },
      },
      "html-loader",
      "pug-html-loader",
    ],
  };
};

export default getPugLoader;
