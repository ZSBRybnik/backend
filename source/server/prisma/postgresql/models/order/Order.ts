import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import productModel from "../product/Product";
import UserModel from "../user/User";

const orderModel = createModel((OrderModel) => {
  OrderModel.int("id", {
    id: true,
    raw: generatePrismaString({
      rawString: `#prisma 
        @default(autoincrement())
      `,
    }),
  })
    .decimal("payment_amount", {
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
