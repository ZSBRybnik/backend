import { docdb } from "@pulumi/aws";
import { parse } from "pg-connection-string";

const { user, password } = parse(process.env.MONGODB_URL || "");
const { Cluster }: typeof docdb = docdb;

new Cluster("zsbrybnik", {
  backupRetentionPeriod: 1,
  clusterIdentifier: "zsbrybnik",
  engine: "docdb",
  masterPassword: password,
  masterUsername: user,
  skipFinalSnapshot: true,
});
