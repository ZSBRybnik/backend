import { collectDefaultMetrics } from "prom-client";

const prefix = "zsb-backend";
collectDefaultMetrics({ prefix });
