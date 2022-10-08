const getNimLoader = () => {
  return {
    test: /\.nim$/,
    loader: "nim-loader",
  };
};

export default getNimLoader;
