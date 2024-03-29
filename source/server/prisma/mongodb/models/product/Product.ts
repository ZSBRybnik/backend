import { createModel } from "schemix";
import allergensOnProducts from "../allergensOnProducts/AllergensOnProducts";
import orderModel from "../order/Order";

const productModel = createModel((ProductModel) => {
  ProductModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: /* prisma */ `@default(auto()) @database.ObjectId`.trim(),
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
