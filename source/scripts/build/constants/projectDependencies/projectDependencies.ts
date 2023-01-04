import projectsDependenciesVersions from "~backend/source/scripts/build/constants/projectsDependenciesVersions/projectsDependenciesVersions";

type ProjectDependencies = Set<keyof typeof projectsDependenciesVersions>;

const projectDependencies: ProjectDependencies = new Set(
  Object.keys(projectsDependenciesVersions),
) as ProjectDependencies;

export default projectDependencies;
