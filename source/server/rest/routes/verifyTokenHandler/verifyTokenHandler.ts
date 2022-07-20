import verifyToken from "~server/rest/utils/verifyToken/verifyToken";
import createHandler from "../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../utils/createHandler/createHandler.types";

const { handler: verifyTokenHandler } = createHandler({
  rawHandler: async ({
    request: {
      headers: { authorization },
    },
    response,
    next,
  }: RawHandlerArguments): Promise<void> => {
    verifyToken({
      token: authorization || "",
      response,
      next,
    });
  },
});

export default verifyTokenHandler;
