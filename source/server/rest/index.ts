import Gun from "gun";
import mainPort from "~backend/source/server/rest/constants/ports/ports";
import createServer from "~backend/source/server/rest/utils/createServer/createServer";
import { CreateServerOuput } from "~backend/source/server/rest/utils/createServer/createServer.types";

const { server, httpServer }: CreateServerOuput = createServer({
  port: mainPort,
});
export const gun = Gun({ file: "gun-database", web: httpServer });

export default server;
