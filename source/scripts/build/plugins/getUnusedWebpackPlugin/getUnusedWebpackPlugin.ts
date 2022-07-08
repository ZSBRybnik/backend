import { join } from "path";
import UnusedWebpackPlugin from "unused-webpack-plugin";
import ExtendedMode from "~scripts/build/types/extendedMode/extendedMode";

type GetUnusedWebpackPluginArguments = {
  extendedMode: ExtendedMode;
};

type NotGericUnsuablePluginPaths = {
  [key in ExtendedMode]: string[];
};

const notGericUnsuablePluginPaths: NotGericUnsuablePluginPaths = {
  [ExtendedMode.Web]: ["main", "preload"],
  [ExtendedMode.Renderer]: ["main", "preload"],
  [ExtendedMode.Mobile]: ["main", "preload"],
  [ExtendedMode.Main]: [],
  [ExtendedMode.Preload]: [],
};

const getUnusedWebpackPlugin = ({
  extendedMode,
}: GetUnusedWebpackPluginArguments) => {
  const extraNotGenericPaths = notGericUnsuablePluginPaths[extendedMode];
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
      ...extraNotGenericPaths,
    ].filter(Boolean),
    root: process.cwd(),
  });
};

export default getUnusedWebpackPlugin;
