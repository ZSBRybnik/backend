import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { Request, Response } from "express";

const databaseClient = new PrismaClient();

const loginHandler = async (request: Request, response: Response) => {
  const { login, password } = request.body;
  const user = await databaseClient.user.findUnique({
    where: { login },
    select: { password: true },
  });
  if (user) {
    const isPasswordValid = await compare(password, user.password);
    if (isPasswordValid) {
      response.sendStatus(200);
    } else {
      response.sendStatus(401);
    }
  } else {
    response.sendStatus(404);
  }
};

export default loginHandler;
