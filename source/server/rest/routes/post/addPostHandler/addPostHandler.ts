import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const databaseClient = new PrismaClient();

const addPostHandler = async (request: Request, response: Response) => {
  const { title, author, content } = request.body;
  await databaseClient.post.create({
    data: { title, author, content },
  });
  response.sendStatus(200);
};

export default addPostHandler;
