const getSvelteLoader = () => {
  return {
    test: /\.(svelte)$/,
    use: "svelte-loader",
  };
};

export default getSvelteLoader;
