const getHaxeLoader = () => {
  return {
    test: /\.hxml$/,
    loader: "haxe-loader",
  };
};

export default getHaxeLoader;
