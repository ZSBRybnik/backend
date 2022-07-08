import { Configuration } from "webpack";

/** Type of getExperiments function argument */
type GetExperimentsArguments = {
  targetToModern: boolean;
};

/** Type of getExperiments function */
type GetExperiments = (
  argument: GetExperimentsArguments,
) => Configuration["experiments"];

/**
 * Function to get customized `experiments` property.
 *
 * @example
 * ```
 * {
 *  experiments: getExperiments({ targetToModern }),
 * }
 * ```
 * @type {GetExperiments}
 * @param {GetExperimentsArguments} argument Arguments wrapper.
 * @param {boolean} argument.targetToModern Determines if `experiments` should be adjusted to modern browsers.
 * @returns {Configuration["experiments"]} Webpack experiments property.
 */
const getExperiments: GetExperiments = ({
  targetToModern,
}: GetExperimentsArguments): Configuration["experiments"] => {
  return {
    syncWebAssembly: true,
    futureDefaults: true,
    asyncWebAssembly: true,
    topLevelAwait: true,
    outputModule: targetToModern,
  };
};

export default getExperiments;
