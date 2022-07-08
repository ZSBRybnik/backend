import type { Server } from "http";
import type { Express } from "express";

export type CreateServerArguments = {
  port: number;
};

export type CreateServer = (argument: CreateServerArguments) => void;

export type CreateServerOuput = {
  server: Express;
  httpServer: Server;
};
