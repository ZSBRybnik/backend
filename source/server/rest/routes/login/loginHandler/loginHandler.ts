import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import createHandler from "~server/rest/utils/createHandler/createHandler";
import type {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~server/rest/utils/createHandler/createHandler.types";
import loginHandlerValidator from "../../../validators/loginHandlerValidator/loginHandlerValidator";

type LoginHandlerBody = {
  login: string;
  password: string;
};

const { handler: loginHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request: {
      body: { login, password },
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
    const user: Pick<User, "password"> | null =
      await postgreSQLClient.user.findUnique({
        where: { login },
        select: { password: true },
      });
    if (user) {
      const isPasswordValid: boolean = await compare(password, user.password);
      if (isPasswordValid) {
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
