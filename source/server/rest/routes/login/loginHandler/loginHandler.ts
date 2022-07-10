import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import createHandler from "~server/rest/utils/createHandler/createHandler";
import type {
  CreateHandlerOutput,
  RawHandlerArguments,
} from "~server/rest/utils/createHandler/createHandler.types";

type LoginHandlerBody = {
  login: string;
  password: string;
};

const { handler: loginHandler }: CreateHandlerOutput = createHandler({
  rawHandler: async ({
    request,
    response,
  }: RawHandlerArguments<{
    body: LoginHandlerBody;
  }>): Promise<void> => {
    const { login, password }: LoginHandlerBody = request.body;
    const user: Pick<User, "password"> | null =
      await request.postgreSQLClient.user.findUnique({
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
