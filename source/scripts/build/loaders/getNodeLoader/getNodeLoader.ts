const getNodeLoader = () => {
  return {
    test: /\.node$/,
    use: ["node-loader"],
  };
};

export default getNodeLoader;
