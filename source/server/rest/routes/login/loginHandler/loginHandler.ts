import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { authenticator } from "otplib";
import EnabledTwoFactorAuthentication from "~server/constants/enabledTwoFactorAuthentication/enabledTwoFactorAuthentication";
import createHandler from "~server/rest/utils/createHandler/createHandler";
import type {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~server/rest/utils/createHandler/createHandler.types";
import loginHandlerValidator from "../../../validators/loginHandlerValidator/loginHandlerValidator";

type LoginHandlerBody = {
  login: string;
  password: string;
  authenticatorCode?: string;
};

const { handler: loginHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      body: { login, password, authenticatorCode },
      postgreSQLClient,
    },
    response,
    next,
  }: RawHandlerArguments<{
    body: LoginHandlerBody;
  }>): Promise<void> => {
    const validator = loginHandlerValidator();
    try {
      await validator.validate(
        { login, password },
        { strict: true, abortEarly: true },
      );
    } catch {
      response.sendStatus(400);
      return next();
    }
    const user:
      | (Pick<User, "password" | "phoneNumber" | "authenticatorCode"> & {
          enabledTwoFactorAuthentication: EnabledTwoFactorAuthentication;
        })
      | null = (await postgreSQLClient.user.findUnique({
      where: { login },
      select: {
        password: true,
        enabledTwoFactorAuthentication: true,
        phoneNumber: true,
        authenticatorCode: true,
      },
    })) as Pick<User, "password" | "phoneNumber" | "authenticatorCode"> & {
      enabledTwoFactorAuthentication: EnabledTwoFactorAuthentication;
    };
    if (user) {
      const {
        password: databasePassword,
        enabledTwoFactorAuthentication,
        //phoneNumber,
        authenticatorCode: databaseAuthenticatorCode,
      } = user;
      const isPasswordValid: boolean = await compare(
        password,
        databasePassword,
      );
      if (isPasswordValid) {
        if (
          enabledTwoFactorAuthentication ===
          EnabledTwoFactorAuthentication.Application
        ) {
          if (!databaseAuthenticatorCode) {
            response.sendStatus(500);
            return next();
          }
          if (!authenticatorCode) {
            response.sendStatus(400);
            return next();
          }
          const isValid = authenticator.verify({
            token: authenticatorCode,
            secret: databaseAuthenticatorCode,
          });
          if (!isValid) {
            response.sendStatus(400);
            return next();
          }
        }
        const token: string = sign({ user: { login } }, "zsbrybnik");
        response.json({ token });
      } else {
        response.sendStatus(401);
      }
    } else {
      response.sendStatus(404);
    }
  },
});

export default loginHandler;
