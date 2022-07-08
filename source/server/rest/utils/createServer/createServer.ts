import type { Express } from "express";
import express from "express";
import applyMiddlewares from "../applyMiddlewares/applyMiddlewares";
import listenOnPort from "../listenOnPort/listenOnPort";
import type {
  CreateServer,
  CreateServerArguments,
  CreateServerOuput,
} from "./createServer.types";

const createServer: CreateServer = ({
  port,
}: CreateServerArguments): CreateServerOuput => {
  const server: Express = express();
  applyMiddlewares({ instance: server });
  const httpServer = listenOnPort({ instance: server, port });
  return { server, httpServer };
};
export default createServer;
