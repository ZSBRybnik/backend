export const zsbrybnikMainRepositoryCollectionName =
  "zsbrybnik-main-repository";
export const zsbrybnikFrontendCollectionsCollectionName =
  "zsbrybnik-frontend-repository";
export const zsbrybnikBackendCollectionsCollectionName =
  "zsbrybnik-backend-repository";

const vectorDatabaseCollectionsNames: Set<string> = new Set([
  zsbrybnikMainRepositoryCollectionName,
  zsbrybnikBackendCollectionsCollectionName,
  zsbrybnikFrontendCollectionsCollectionName,
]);

export default vectorDatabaseCollectionsNames;
