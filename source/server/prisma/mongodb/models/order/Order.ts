import { createModel } from "schemix";
import productModel from "../product/Product";
import UserModel from "../user/User";

const orderModel = createModel((OrderModel) => {
  OrderModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: /* prisma */ `@default(auto()) @database.ObjectId`.trim(),
  })
    .int("id", {
      unique: true,
    })
    .string("paymentAmount", {
      map: "payment_amount",
    })
    .dateTime("transactionDate", { map: "transaction_date" })
    .relation("products", productModel, { list: true })
    .relation("user", UserModel, {
      fields: ["userId"],
      references: ["id"],
    })
    .int("userId")
    .map("orders");
});

export default orderModel;
