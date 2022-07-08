import { join } from "path";
import { Configuration } from "webpack-dev-server";
import destination from "~scripts/build/constants/destination/destination";
import source from "~scripts/build/constants/source/source";
import ExtendedMode from "~scripts/build/types/extendedMode/extendedMode";

type GetDevelopmentServerArguments = {
  targetToModern: boolean;
  extendedMode: ExtendedMode;
};

type GetDevelopmentServer = (
  argument: GetDevelopmentServerArguments,
) => Configuration | undefined;

/**
 * Function to get customized `devServer` property.
 *
 * @example
 * ```
 * {
 *  devServer: getDevelopmentServer({ targetToModern, extendedMode }),
 * }
 * ```
 * @type {GetDevelopmentServer}
 * @param {GetDevelopmentServerArguments} argument Arguments wrapper.
 * @param {boolean} argument.targetToModern Determines if `devServer` should be adjusted to modern browsers.
 * @param {ExtendedMode} argument.extendedMode Determines target.
 * @returns {Configuration | undefined} Webpack devServer property.
 */
const getDevelopmentServer: GetDevelopmentServer = ({
  targetToModern,
  extendedMode,
}: GetDevelopmentServerArguments): Configuration | undefined => {
  return targetToModern
    ? {
        host: "0.0.0.0",
        allowedHosts: "all",
        client: {
          overlay: false,
        },
        historyApiFallback: true,
        static: join(process.cwd(), destination),
        compress: true,
        hot: true,
        devMiddleware: {
          writeToDisk: true,
          publicPath: "/",
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers":
            "X-Requested-With, content-type, Authorization",
        },
        watchFiles: [join(".", source), join(".", destination)],
        https: extendedMode !== ExtendedMode.Mobile,
      }
    : undefined;
};

export default getDevelopmentServer;
