import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";

const model = createModel((ProductModel) => {
  ProductModel.string("mongo_id", {
    map: "_id",
    raw: generatePrismaString({
      rawString: `#prisma 
        @id @default(auto()) @database.ObjectId
      `,
    }),
  })
    .int("id", {
      unique: true,
    })
    .string("name")
    .float("price")
    .int("quantity")
    .string("description")
    .map("products");
});

export default model;
