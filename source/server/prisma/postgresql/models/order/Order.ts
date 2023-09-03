import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import schemixUserModel from "~backend/source/server/prisma/postgresql/models/user/User";
import schemixProductModel from "~frontend/../backend/source/server/prisma/postgresql/models/product/Product";

const schemixOrderModel: PrismaModel = createModel(
  (OrderModel: PrismaModel): void => {
    OrderModel.int("id", {
      id: true,
      raw: /* prisma */ ` 
        @default(autoincrement())
      `.trim(),
    })
      .decimal("paymentAmount", {
        map: "payment_amount",
      })
      .dateTime("transactionDate", { map: "transaction_date" })
      .relation("products", schemixProductModel, { list: true })
      .relation("user", schemixUserModel, {
        fields: ["userId"],
        references: ["id"],
      })
      .int("userId")
      .map("orders");
  },
);

export default schemixOrderModel;
