import { Configuration } from "webpack";

/** Type of getExperiments function */
type GetExperiments = () => Configuration["experiments"];

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
 * @returns {Configuration["experiments"]} Webpack experiments property.
 */
const getExperiments: GetExperiments = (): Configuration["experiments"] => {
  return {
    syncWebAssembly: true,
    futureDefaults: true,
    asyncWebAssembly: true,
    topLevelAwait: true,
  };
};

export default getExperiments;
