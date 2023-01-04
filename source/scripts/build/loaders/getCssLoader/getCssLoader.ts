import { resolve } from "path";

const getCssLoader = () => {
  return {
    test: /\.(css|scss|sass)$/,
    use: [
      {
        loader: "cache-loader",
        options: {
          cacheDirectory: resolve(".webpackCache"),
        },
      },
      "style-loader",
      "css-loader",
      "sass-loader",
    ],
  };
};

export default getCssLoader;
