import createHandler from "../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../utils/createHandler/createHandler.types";

const { handler: verifyTokenHandler } = createHandler({
  rawHandler: async ({
    request: { verifyToken },
  }: RawHandlerArguments): Promise<void> => {
    verifyToken();
  },
});

export default verifyTokenHandler;
