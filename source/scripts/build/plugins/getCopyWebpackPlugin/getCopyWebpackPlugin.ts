import CopyWebpackPlugin, { Pattern } from "copy-webpack-plugin";
import { join } from "path";
import destination from "~backend/source/scripts/build/constants/destination/destination";
import source from "~backend/source/scripts/build/constants/source/source";

type GetCopyWebpackPlugin = () => CopyWebpackPlugin;

const getCopyWebpackPlugin: GetCopyWebpackPlugin = (): CopyWebpackPlugin => {
  return new CopyWebpackPlugin({
    patterns: [
      {
        from: join(process.cwd(), source, "native-addon-go", destination),
        to: join(process.cwd(), destination, source),
        noErrorOnMissing: true,
      },
      {
        from: join(process.cwd(), source, "public", "lambdas"),
        to: join(process.cwd(), destination, "source"),
        noErrorOnMissing: true,
      },
      {
        from: join(process.cwd(), source, "public", "static"),
        to: join(process.cwd(), destination, "public"),
        noErrorOnMissing: true,
      },
    ].filter(Boolean) as Pattern[],
    options: {
      concurrency: 100,
    },
  });
};

export default getCopyWebpackPlugin;
