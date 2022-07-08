const getSourceMapLoader = () => {
  return {
    test: /\.(js)$/,
    enforce: "pre",
    exclude: /(node_modules)/,
    use: ["source-map-loader"],
  };
};

export default getSourceMapLoader;
