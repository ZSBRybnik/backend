import nodeExternals from "webpack-node-externals";

const getExternals = () => {
  return [
    nodeExternals({
      allowlist: [/^(?!(^(ffi-napi)$)).*$/i],
    }),
  ];
};

export default getExternals;
