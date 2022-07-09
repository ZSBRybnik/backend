import express, { Express } from "express";
import { Server } from "http";
import { check } from "tcp-port-used";
import { expectType } from "tsd";
import mainPort from "~server/rest/constants/ports/ports";
import listenOnPort from "~server/rest/utils/listenOnPort/listenOnPort";

describe("listenOnPort", (): void => {
  it("reserves valid port", async (): Promise<void> => {
    const server: Express = express();
    const httpServer: Server = listenOnPort({
      instance: server,
      port: mainPort,
    });
    const inUse = await check(mainPort);
    expect(inUse).toBe(true);
    httpServer.close();
  });
  it("return has valid type", (): void => {
    const server: Express = express();
    const httpServer: Server = listenOnPort({
      instance: server,
      port: mainPort,
    });
    expectType<Server>(httpServer);
    httpServer.close();
  });
  it("return has valid structure", (): void => {
    const server: Express = express();
    const httpServer: Server = listenOnPort({
      instance: server,
      port: mainPort,
    });
    expect(httpServer).toBeInstanceOf(Server);
    httpServer.close();
  });
});
