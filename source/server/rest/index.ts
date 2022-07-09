import mainPort from "~server/rest/constants/ports/ports";
import createServer from "~server/rest/utils/createServer/createServer";
import { CreateServerOuput } from "~server/rest/utils/createServer/createServer.types";

const { server }: CreateServerOuput = createServer({ port: mainPort });

export default server;
