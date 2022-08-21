import Gun from "gun";
import mainPort from "~server/rest/constants/ports/ports";
import createServer from "~server/rest/utils/createServer/createServer";
import { CreateServerOuput } from "~server/rest/utils/createServer/createServer.types";

const { server, httpServer }: CreateServerOuput = createServer({
  port: mainPort,
});
export const gun = Gun({ file: "gun-database", web: httpServer });

export default server;
