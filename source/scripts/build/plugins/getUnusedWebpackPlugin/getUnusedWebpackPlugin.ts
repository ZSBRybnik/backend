import { join } from "path";
import UnusedWebpackPlugin from "unused-webpack-plugin";

const getUnusedWebpackPlugin = () => {
  return new UnusedWebpackPlugin({
    directories: [join(process.cwd(), "source")],
    exclude: [
      "*.test.ts",
      "*.test.ts.snap",
      "*.test.tsx",
      "*.test.tsx.snap",
      "setupIntegrationTests.ts",
      "setupTests.ts",
      "public/notStatic",
      "public/static",
      "types",
      "scripts",
      "native-addon-rust",
      "native-addon-go",
      "wasm-rust",
      "wasm-go",
    ].filter(Boolean),
    root: process.cwd(),
  });
};

export default getUnusedWebpackPlugin;
