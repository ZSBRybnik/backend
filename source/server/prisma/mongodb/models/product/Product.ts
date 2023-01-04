import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import allergensOnProducts from "../allergensOnProducts/AllergensOnProducts";
import orderModel from "../order/Order";

const productModel = createModel((ProductModel) => {
  ProductModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: generatePrismaString({
      rawString: `#prisma 
        @default(auto()) @database.ObjectId
      `,
    }),
  })
    .int("id", {
      unique: true,
    })
    .relation("order", orderModel, {
      fields: ["orderId"],
      references: ["id"],
    })
    .int("orderId")
    .string("name")
    .float("price")
    .int("quantity")
    .string("description")
    .relation("allergensOnProducts", allergensOnProducts, {
      list: true,
    })
    .map("products");
});

export default productModel;
