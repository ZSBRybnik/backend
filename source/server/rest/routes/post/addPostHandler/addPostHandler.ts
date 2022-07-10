import { Response } from "express";
import Request from "~server/rest/types/request/request";

const addPostHandler = async (request: Request, response: Response) => {
  const { title, author, content } = request.body;
  await request.postgreSQLClient.post.create({
    data: { title, author, content },
  });
  response.sendStatus(200);
};

export default addPostHandler;
