import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";

const model = createModel((ProductModel) => {
  ProductModel.int("id", {
    raw: generatePrismaString({
      rawString: `#prisma 
          @id @default(autoincrement())
      `,
    }),
  })
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
    .map("products");
});

export default model;
