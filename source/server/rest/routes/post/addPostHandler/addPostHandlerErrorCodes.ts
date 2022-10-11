import { NextFunction } from "express";
import ipfsClient from "~backend/source/server/clients/ipfsClient/ipfsClient";
import mongoDBClient from "~backend/source/server/clients/mongoDBClient/mongoDBClient";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";
import postgreSQLClient from "~backend/source/server/clients/postgreSQLClient/postgreSQLClient";
import Response from "../../../types/response/response";
import { AddPostHandler } from "./addPostHandler";

type AddPostHandlerErrorCodes = {
  response: Response;
  next: NextFunction;
  data: AddPostHandler;
};

const addPostHandlerErrorCodes = async ({
  response,
  next,
  data: { brief, content, ...rest },
}: AddPostHandlerErrorCodes): Promise<void> => {
  try {
    const post = await postgreSQLClient.post.create({
      data: { ...rest, content, brief: brief || content.slice(0, 150) },
    });
    natsClient.publish("post.add", jsonCodec.encode(post));
    const mongoDBPromise = mongoDBClient.post.create({
      data: post,
    });
    const ipfsPromise = ipfsClient.add(post);
    const [{ cid }] = await Promise.all([ipfsPromise, mongoDBPromise]);
    console.log(cid);
    //await faunaDBClient.query(
    //Insert(Ref(Collection("posts")), 1, "create", {
    //   data: { cid, id: post.id },
    // }),
    // );
  } catch (e) {
    console.error(e);
    response.sendStatus(400);
    return next();
  }
};
export default addPostHandlerErrorCodes;
