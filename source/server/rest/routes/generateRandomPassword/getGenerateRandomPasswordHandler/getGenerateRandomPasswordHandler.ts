// import { BraketClient } from "@aws-sdk/client-braket";
import createHandler from "../../../utils/createHandler/createHandler";
import { RawHandlerArguments } from "../../../utils/createHandler/createHandler.types";

const { handler: generateRandomPasswordHandler } = createHandler({
  rawHandler: async ({ response }: RawHandlerArguments): Promise<void> => {
    //const client = new BraketClient({ region: "" });
    //const awsResponse = await client.send("");
    response.sendStatus(200);
  },
});

export default generateRandomPasswordHandler;
