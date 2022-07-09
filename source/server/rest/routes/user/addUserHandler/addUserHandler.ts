import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { Request, Response } from "express";
import { random, times } from "lodash";
import { authenticator } from "otplib";

const databaseClient = new PrismaClient();

const addUserHandler = async (request: Request, response: Response) => {
  const { login, email, role } = request.body;
  const randomPassword: string = times(10, () => random(35).toString(36)).join(
    "",
  );
  const hashedPassword: string = await hash(randomPassword, 11);
  const googleAuthCode: string = authenticator.generateSecret();
  await databaseClient.user.create({
    data: {
      login,
      email,
      role,
      password: hashedPassword,
      authenticator_code: googleAuthCode,
    },
  });
  response.sendStatus(200);
};

export default addUserHandler;
