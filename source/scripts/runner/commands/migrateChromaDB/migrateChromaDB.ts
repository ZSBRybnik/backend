import chromaClient from "~backend/source/server/clients/chromaClient/chromaClient";

new Set(["zsbrybnik-main-repository", "zsbrybnik-frontend-repository"]).forEach(
  async (collectionName) => {
    try {
      await chromaClient.deleteCollection(collectionName);
    } catch {}
    await chromaClient.createCollection(collectionName);
  },
);
