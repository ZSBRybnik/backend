/* eslint-disable max-params */
import { Post } from "@prisma/postgresql";
import { Collection, Insert, Ref } from "faunadb";
import faunaDBClient from "~backend/source/server/clients/faunaClient/faunaClient";
import ipfsClient from "~backend/source/server/clients/ipfsClient/ipfsClient";
import mongoDBClient from "~backend/source/server/clients/mongoDBClient/mongoDBClient";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

natsClient.subscribe("post.add", {
  callback: async (_error, { data }) => {
    const post: Post = jsonCodec.decode(data) as Post;
    const mongoDBPromise = mongoDBClient.post.create({
      data: post,
    });
    const ipfsPromise = ipfsClient.add(post);
    const [{ cid }] = await Promise.all([ipfsPromise, mongoDBPromise]);
    await faunaDBClient.query(
      Insert(Ref(Collection("posts")), 1, "create", {
        data: { cid, id: post.id },
      }),
    );
  },
});
