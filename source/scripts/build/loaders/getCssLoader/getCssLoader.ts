const getCssLoader = () => {
  return {
    test: /\.(css|scss|sass)$/,
    use: ["style-loader", "css-loader", "sass-loader"],
  };
};

export default getCssLoader;
