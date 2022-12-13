import { Collection, CreateCollection, CreateIndex } from "faunadb";
import faunaDBClient from "../clients/faunaClient/faunaClient";

(async () => {
  const createSubpagesCollectionPromise = faunaDBClient.query(
    CreateCollection({
      name: "pages",
      history_days: 0,
    }),
  );
  const createPostsCollectionPromise = faunaDBClient.query(
    CreateCollection({
      name: "posts",
      history_days: 0,
    }),
  );

  await Promise.all([
    createSubpagesCollectionPromise,
    createPostsCollectionPromise,
  ]);

  const createSubpageByNameIndexPromise = faunaDBClient.query(
    CreateIndex({
      name: "subpage_by_name",
      source: Collection("pages"),
      terms: [{ field: ["data", "name"] }],
    }),
  );

  const createPostByIdIndexPromise = faunaDBClient.query(
    CreateIndex({
      name: "post_by_id",
      source: Collection("posts"),
      terms: [{ field: ["data", "id"] }],
    }),
  );

  await Promise.all([
    createSubpageByNameIndexPromise,
    createPostByIdIndexPromise,
  ]);
})();
