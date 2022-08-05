import { join } from "path";

type GetResolveArguments = {
  sourceFolder: string;
};

const getResolve = ({ sourceFolder }: GetResolveArguments) => {
  return {
    extensions: [".js", ".ts", ".tsx", ".jsx", ".mjs", ".wasm", ".json"],
    alias: {
      "~root": join(process.cwd()),
      "~server": join(process.cwd(), sourceFolder, "server"),
      "~shared": join(process.cwd(), sourceFolder, "shared"),
      "~public": join(process.cwd(), sourceFolder, "public"),
    },
  };
};

export default getResolve;
