import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import schemixProductModel from "~backend/source/server/prisma/postgresql/models/product/product";
import schemixUserModel from "~backend/source/server/prisma/postgresql/models/user/User";
import generatePrismaString from "~backend/source/server/prisma/utils/generatePrismaString/generatePrismaString";

const schemixOrderModel: PrismaModel = createModel(
  (OrderModel: PrismaModel): void => {
    OrderModel.int("id", {
      id: true,
      raw: generatePrismaString({
        rawString: `#prisma 
          @default(autoincrement())
        `,
      }),
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
