const getGraphQLLoader = () => {
  return {
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: "graphql-tag/loader",
  };
};

export default getGraphQLLoader;
