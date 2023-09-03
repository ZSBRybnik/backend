import { createModel, PrismaModel } from "schemix";
import schemixOrderModel from "~backend/source/server/prisma/postgresql/models/order/Order";
import schemixAllergensOnProductsModel from "../allergensOnProducts/AllergensOnProducts";

const schemixProductModel: PrismaModel = createModel(
  (ProductModel: PrismaModel): void => {
    ProductModel.int("id", {
      id: true,
      raw: /* prisma */ ` 
          @default(autoincrement())
        `,
    })
      .relation("orders", schemixOrderModel, {
        fields: ["orderId"],
        references: ["id"],
      })
      .int("orderId", {
        map: "order_id",
      })
      .string("name", {
        raw: /* prisma */ ` 
            @database.VarChar(255)
          `,
      })
      .decimal("price")
      .int("quantity")
      .string("description", {
        raw: /* prisma */ ` 
            @database.Text
          `,
      })
      .relation("allergensOnProducts", schemixAllergensOnProductsModel, {
        list: true,
      })
      .map("products");
  },
);

export default schemixProductModel;
