import type { Express } from "express";
import type { Server } from "http";

export type CreateServerArguments = {
  port: number;
};

export type CreateServer = (
  argument: CreateServerArguments,
) => CreateServerOutput;

export type CreateServerOutput = {
  server: Express;
  httpServer: Server;
};
