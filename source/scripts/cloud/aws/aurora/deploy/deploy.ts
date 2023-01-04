import { rds } from "@pulumi/aws";
import { Input } from "@pulumi/pulumi";
import "dotenv/config";
import { parse } from "pg-connection-string";

const { user, password, database } = parse(process.env.POSTGRESQL_URL || "");
const { Cluster, ClusterInstance, getEngineVersion }: typeof rds = rds;

const { engine, id, engineVersion }: rds.Cluster = new Cluster("zsbrybnik", {
  clusterIdentifier: "zsbrybnik",
  engine: "aurora-postgresql",
  engineMode: "provisioned",
  engineVersion: (
    await getEngineVersion({
      engine: "aurora-postgresql",
    })
  ).version,
  databaseName: database || "zsbrybnik",
  masterUsername: user,
  masterPassword: password,
});

new ClusterInstance("exampleClusterInstance", {
  clusterIdentifier: id,
  instanceClass: "db.serverless",
  engine: engine as Input<rds.EngineType>,
  engineVersion: engineVersion,
});
