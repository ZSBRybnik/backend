/* eslint-disable max-params */
import { Subpage } from "@prisma/postgresql";
import { Delete, Index, Match } from "faunadb";
import faunaDBClient from "~backend/source/server/clients/faunaClient/faunaClient";
import mongoDBClient from "~backend/source/server/clients/mongoDBClient/mongoDBClient";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

natsClient.subscribe("page.delete.*", {
  callback: async (_error, { data }) => {
    const { name }: Subpage = jsonCodec.decode(data) as Subpage;
    try {
      const mongoDBPromise = mongoDBClient.page.delete({
        where: { name },
      });
      const faunaDBPromise = faunaDBClient.query(
        Delete(Match(Index("pages_by_name"), name)),
      );
      await Promise.all([faunaDBPromise, mongoDBPromise]);
    } catch {
      natsClient.publish(`page.delete.${name}`, data);
    }
  },
});
