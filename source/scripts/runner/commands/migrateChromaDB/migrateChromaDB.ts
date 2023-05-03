import chromaClient from "~backend/source/server/clients/chromaClient/chromaClient";
import vectorDatabaseCollectionsNames from "~backend/source/server/constants/vectorDatabaseCollectionsNames/vectorDatabaseCollectionsNames";

vectorDatabaseCollectionsNames.forEach(
  async (collectionName: string): Promise<void> => {
    try {
      await chromaClient.deleteCollection(collectionName);
    } catch {}
    await chromaClient.createCollection(collectionName);
  },
);
