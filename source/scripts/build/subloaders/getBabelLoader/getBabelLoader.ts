const getBabelLoader = () => {
  return {
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
      plugins: [
        "universal-import",
        "vuera/babel",
        "inline-react-svg",
        "@emotion",
      ],
    },
  };
};

export default getBabelLoader;
