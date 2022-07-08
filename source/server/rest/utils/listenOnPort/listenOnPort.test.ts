import express, { Express } from "express";
import mainPort from "~rest/constants/ports";
import { check } from "tcp-port-used";
import listenOnPort from "~rest/utils/listenOnPort/listenOnPort";
import { expectType } from "tsd";
import { Server } from "http";

describe("listenOnPort", (): void => {
  it("reserves valid port", async (): Promise<void> => {
    const server: Express = express();
    const httpServer: Server = listenOnPort(server, mainPort);
    const inUse = await check(mainPort);
    expect(inUse).toBe(true);
    httpServer.close();
  });
  it("return has valid type", (): void => {
    const server: Express = express();
    const httpServer: Server = listenOnPort(server, mainPort);
    expectType<Server>(httpServer);
    httpServer.close();
  });
  it("return has valid structure", (): void => {
    const server: Express = express();
    const httpServer: Server = listenOnPort(server, mainPort);
    expect(httpServer).toBeInstanceOf(Server);
    httpServer.close();
  });
});
