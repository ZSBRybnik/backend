import type { NextHandleFunction } from "connect";

export type GetJsonBodyParserMiddleware = () => NextHandleFunction;
