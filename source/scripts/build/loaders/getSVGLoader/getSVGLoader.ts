import { resolve } from "path";

const getSVGLoader = () => {
  return {
    test: /\.svg$/,
    use: [
      {
        loader: "cache-loader",
        options: {
          cacheDirectory: resolve(".webpackCache"),
        },
      },
      "@svgr/webpack",
    ],
  };
};

export default getSVGLoader;
