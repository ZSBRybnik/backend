import { GithubRepoLoader } from "langchain/document_loaders";

const githubRepositoryVectorDataLoader = new GithubRepoLoader(
  "https://github.com/ZSBRybnik/ZSB",
  { branch: "master", recursive: true, unknown: "warn" },
);
const githubRepositoryFrontendVectorDataLoader = new GithubRepoLoader(
  "https://github.com/ZSBRybnik/frontend",
  { branch: "master", recursive: true, unknown: "warn" },
);
const githubRepositoryBackendVectorDataLoader = new GithubRepoLoader(
  "https://github.com/ZSBRybnik/backend",
  { branch: "master", recursive: true, unknown: "warn" },
);
const githubRepositoryVectorData = (
  await Promise.all([
    githubRepositoryVectorDataLoader.load(),
    githubRepositoryFrontendVectorDataLoader.load(),
    githubRepositoryBackendVectorDataLoader.load(),
  ])
).flat();

export default githubRepositoryVectorData;
