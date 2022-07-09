import type { Express } from "express";
import express from "express";
import type { Server } from "http";
import applyMiddlewares from "~server/rest/utils/applyMiddlewares/applyMiddlewares";
import applyRoutes from "~server/rest/utils/applyRoutes/applyRoutes";
import type {
  CreateServer,
  CreateServerArguments,
  CreateServerOuput,
} from "~server/rest/utils/createServer/createServer.types";
import listenOnPort from "~server/rest/utils/listenOnPort/listenOnPort";

const createServer: CreateServer = ({
  port,
}: CreateServerArguments): CreateServerOuput => {
  const server: Express = express();
  applyMiddlewares({ instance: server });
  applyRoutes({ instance: server });
  const httpServer: Server = listenOnPort({ instance: server, port });
  return { server, httpServer };
};
export default createServer;
