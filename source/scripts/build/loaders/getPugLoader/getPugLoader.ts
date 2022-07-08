const getPugLoader = () => {
  return {
    test: /\.pug$/,
    use: ["html-loader", "pug-html-loader"],
  };
};

export default getPugLoader;
