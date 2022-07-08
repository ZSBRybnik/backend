const getSVGLoader = () => {
  return {
    test: /\.svg$/,
    use: ["@svgr/webpack"],
  };
};

export default getSVGLoader;
