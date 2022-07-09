import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

const databaseClient = new PrismaClient();

type LoginHandler = (request: Request, response: Response) => Promise<void>;

const loginHandler: LoginHandler = async (
  request: Request,
  response: Response,
): Promise<void> => {
  const { login, password } = request.body;
  const user = await databaseClient.user.findUnique({
    where: { login },
    select: { password: true },
  });
  if (user) {
    const isPasswordValid = await compare(password, user.password);
    if (isPasswordValid) {
      const token = sign({ user: { login } }, "zsbrybnik");
      response.json({ token });
    } else {
      response.sendStatus(401);
    }
  } else {
    response.sendStatus(404);
  }
};

export default loginHandler;
