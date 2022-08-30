/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Gun /*, { GunOptions }*/ from "gun";
//import mongoose, { Schema } from "mongoose";
import mainPort from "~server/rest/constants/ports/ports";
import createServer from "~server/rest/utils/createServer/createServer";
import { CreateServerOuput } from "~server/rest/utils/createServer/createServer.types";

//const { Flint, NodeAdapter } = await import("gun-flint" as any);

const { server, httpServer }: CreateServerOuput = createServer({
  port: mainPort,
});

//let initialized = false;

/*const myGunAdapter = new NodeAdapter({
  opt: async () => {
    await mongoose.connect("mongodb://localhost:27017/gun");
    mongoose.model("Gun", new Schema({}), "gun");
    initialized = true;
  },
  get: async (key: string, done: (error: null, data?: unknown) => void) => {
    if (initialized) {
      const collection = await mongoose.connection.db.collection("gun");
      const data = await collection.findOne({
        _id: key,
      });
      console.log(data);
      done(null, data ?? {});
    }
  },
  put: async (
    key: string,
    node: string,
    done: (error: null, data?: unknown) => void,
  ) => {
    if (initialized) {
      const collection = await mongoose.connection.db.collection("gun");
      await collection.updateMany(
        { _id: key },
        {
          key: key,
          val: node,
        },
      );
      done(null);
    }
  },
});

Flint.register(myGunAdapter);*/

export const gun = Gun({
  file: "gun-database",
  web: httpServer,
});

export default server;
