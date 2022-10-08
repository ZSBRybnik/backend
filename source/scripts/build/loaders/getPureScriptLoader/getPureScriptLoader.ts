const getPureScriptLoader = () => {
  return {
    test: /\.purs$/,
    loader: "purs-loader",
    exclude: /node_modules/,
  };
};

export default getPureScriptLoader;
