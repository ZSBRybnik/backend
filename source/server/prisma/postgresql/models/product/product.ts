import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import allergensOnProducts from "../allergensOnProducts/AllergensOnProducts";
import orderModel from "../order/Order";

const productModel = createModel((ProductModel) => {
  ProductModel.int("id", {
    raw: generatePrismaString({
      rawString: `#prisma 
        @id @default(autoincrement())
      `,
    }),
  })
    .relation("order", orderModel, {
      fields: ["orderId"],
      references: ["id"],
    })
    .int("orderId")
    .string("name", {
      raw: generatePrismaString({
        rawString: `#prisma 
          @database.VarChar(255)
        `,
      }),
    })
    .decimal("price")
    .int("quantity")
    .string("description", {
      raw: generatePrismaString({
        rawString: `#prisma 
          @database.Text
        `,
      }),
    })
    .relation("allergensOnProducts", allergensOnProducts, {
      list: true,
    })
    .map("products");
});

export default productModel;
