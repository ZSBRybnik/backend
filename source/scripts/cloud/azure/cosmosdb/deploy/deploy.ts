import { cosmosdb } from "@pulumi/azure";

const { resourceGroupName, name }: cosmosdb.GetAccountResult =
  await cosmosdb.getAccount({
    name: "zsbrybnik",
    resourceGroupName: "zsbrybnik",
  });

new cosmosdb.MongoDatabase("zsbrybnik", {
  resourceGroupName: resourceGroupName,
  accountName: name,
});
