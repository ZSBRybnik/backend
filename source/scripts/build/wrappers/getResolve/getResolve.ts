import { join } from "path";

type GetResolveArguments = {
  sourceFolder: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getResolve = (_argument: GetResolveArguments) => {
  return {
    extensions: [
      ".js",
      ".ts",
      ".tsx",
      ".jsx",
      ".mjs",
      ".wasm",
      ".json",
      ".svelte",
      ".vue",
    ],
    alias: {
      "~backend": join(process.cwd()),
    },
  };
};

export default getResolve;
