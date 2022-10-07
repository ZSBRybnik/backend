import { cosmosdb } from "@pulumi/azure";

const { getAccount, MongoDatabase }: typeof cosmosdb = cosmosdb;

const { resourceGroupName, name }: cosmosdb.GetAccountResult = await getAccount(
  {
    name: "zsbrybnik",
    resourceGroupName: "zsbrybnik",
  },
);

new MongoDatabase("zsbrybnik", {
  resourceGroupName: resourceGroupName,
  accountName: name,
});
