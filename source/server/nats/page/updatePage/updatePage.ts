/* eslint-disable max-params */
import { Page } from "@prisma/postgresql";
import { Index, Match, Update } from "faunadb";
import faunaDBClient from "~backend/source/server/clients/faunaClient/faunaClient";
import ipfsClient from "~backend/source/server/clients/ipfsClient/ipfsClient";
import mongoDBClient from "~backend/source/server/clients/mongoDBClient/mongoDBClient";
import natsClient, {
  jsonCodec,
} from "~backend/source/server/clients/natsClient/natsClient";

natsClient.subscribe("page.update.*", {
  callback: async (_error, { data }) => {
    const { id, name, ...pageData }: Page = jsonCodec.decode(data) as Page;
    try {
      const mongoDBPromise = mongoDBClient.page.update({
        data: { id, name, ...pageData },
        where: { id },
      });
      const ipfsPromise = ipfsClient.add(
        JSON.stringify({ id, name, ...pageData }),
      );
      const [{ cid }] = await Promise.all([ipfsPromise, mongoDBPromise]);
      await faunaDBClient.query(
        Update(Match(Index("pages_by_name"), name), {
          data: { cid, id },
        }),
      );
    } catch {
      natsClient.publish(`page.update.${id}`, data);
    }
  },
});
