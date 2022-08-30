import { merge } from "lodash";
import { dependencies as rootDependencies } from "~backend/package.json";
//import { peerDependencies as nativeAddonGolangPeerDependencies } from "~backend/source/native-addon-go/package.json";
//import { devDependencies as nativeAddonRustDevelopmentDependencies } from "~backend/source/native-addon-rust/package.json";

type ProjectsDependenciesVersions = {
  [key in keyof typeof rootDependencies]: string;
  //| keyof typeof nativeAddonRustDevelopmentDependencies
  //| keyof typeof nativeAddonGolangPeerDependencies]: string;
};

const projectsDependenciesVersions: ProjectsDependenciesVersions = merge(
  rootDependencies,
  //nativeAddonRustDevelopmentDependencies,
  //nativeAddonRustDevelopmentDependencies,
  //nativeAddonGolangPeerDependencies,
) as ProjectsDependenciesVersions;

export default projectsDependenciesVersions;
