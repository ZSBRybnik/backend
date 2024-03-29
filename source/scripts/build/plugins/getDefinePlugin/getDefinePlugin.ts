import { sync } from "glob";
import { join } from "path";
import { DefinePlugin } from "webpack";
import projectDependencies from "~backend/source/scripts/build/constants/projectDependencies/projectDependencies";
import projectsDependenciesVersions from "~backend/source/scripts/build/constants/projectsDependenciesVersions/projectsDependenciesVersions";
import Mode from "~backend/source/scripts/build/types/mode/mode";
import { TargetType } from "~backend/source/shared/constants/TargetType";

type GetLocalizedLanguages = () => string[];

const getLocalizedLanguages: GetLocalizedLanguages = (): string[] => {
  const files: string[] = sync(
    join(process.cwd(), "source", "public", "static", "locales", "**/??.json"),
  );
  return files.map((file: string): string => file.split(".")[0].slice(-2));
};

type GetDefinePluginArguments = {
  mode: Mode;
  targetToModern: boolean;
  publicURL: string;
};

type GetDefinePlugin = (argument: GetDefinePluginArguments) => DefinePlugin;

const getDefinePlugin: GetDefinePlugin = ({
  mode,
  targetToModern,
  publicURL,
}: GetDefinePluginArguments): DefinePlugin => {
  return new DefinePlugin({
    "process.env.TARGET": JSON.stringify(TargetType.Server),
    "process.env.DEVELOPMENT": JSON.stringify(mode === Mode.Development),
    "process.env.MODERN": JSON.stringify(targetToModern),
    "process.env.PUBLIC_URL": JSON.stringify(publicURL),
    "process.env.WEBSOCKET_URL": JSON.stringify(process.env.WEBSOCKET_URL),
    "process.env.REDIS_ADDRESS": JSON.stringify(process.env.REDIS_ADDRESS),
    "process.env.LOCALIZED_LANGUAGES": JSON.stringify(getLocalizedLanguages()),
    "process.env.GOOGLE_ANALYTICS_ID": JSON.stringify(
      process.env.GOOGLE_ANALYTICS_ID,
    ),
    "process.env.STRIPE_PUBLISH_KEY": JSON.stringify(
      process.env.STRIPE_PUBLISH_KEY,
    ),
    "process.env.PROJECT_DEPENDENSIES": JSON.stringify(projectDependencies),
    "process.env.PROJECT_DEPENDENSIES_VERSIONS": JSON.stringify(
      projectsDependenciesVersions,
    ),
  });
};

export default getDefinePlugin;
