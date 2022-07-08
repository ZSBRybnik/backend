import { join, resolve } from "path";

type GetResolveArguments = {
  sourceFolder: string;
};

const getResolve = ({ sourceFolder }: GetResolveArguments) => {
  return {
    extensions: [".js", ".ts", ".tsx", ".jsx", ".mjs", ".wasm", ".json"],
    alias: {
      "@babel/runtime": resolve(
        process.cwd(),
        "node_modules",
        "@babel",
        "runtime",
      ),
      punycode: resolve(process.cwd(), "node_modules", "punycode"),
      querystring: resolve(process.cwd(), "node_modules", "querystring"),
      "bn.js": resolve(process.cwd(), "node_modules", "bn.js"),
      buffer: resolve(process.cwd(), "node_modules", "buffer"),
      "@toruslabs/http-helpers": resolve(
        process.cwd(),
        "node_modules",
        "@toruslabs",
        "http-helpers",
      ),
      "@ledgerhq/hw-transport": resolve(
        process.cwd(),
        "node_modules",
        "@ledgerhq",
        "hw-transport",
      ),
      "~root": join(process.cwd(), sourceFolder),
      "~preload": join(process.cwd(), sourceFolder, "preload"),
      "~main": join(process.cwd(), sourceFolder, "main"),
      "~renderer": join(process.cwd(), sourceFolder, "renderer"),
      "~shared": join(process.cwd(), sourceFolder, "shared"),
      "~public": join(process.cwd(), sourceFolder, "public"),
    },
  };
};

export default getResolve;
