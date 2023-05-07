export const zsbrybnikMainRepositoryCollectionName = "zsbrybnikmainrepository";
export const zsbrybnikFrontendCollectionsCollectionName =
  "zsbrybnikfrontendrepository";
export const zsbrybnikBackendCollectionsCollectionName =
  "zsbrybnikbackendrepository";

const vectorDatabaseCollectionsNames: Set<string> = new Set([
  zsbrybnikMainRepositoryCollectionName,
  zsbrybnikBackendCollectionsCollectionName,
  zsbrybnikFrontendCollectionsCollectionName,
]);

export default vectorDatabaseCollectionsNames;
