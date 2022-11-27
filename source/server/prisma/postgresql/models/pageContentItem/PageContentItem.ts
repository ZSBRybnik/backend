import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";

const pageContentItemModel = createModel((pageContentItemModel) => {
  pageContentItemModel
    .int("id", {
      raw: generatePrismaString({
        rawString: `#prisma
          @id @default(autoincrement())
        `,
      }),
    })
    .string("content", {
      raw: generatePrismaString({
        rawString: `#prisma
          @database.Text
        `,
      }),
    })
    .string("runtime", {
      raw: generatePrismaString({
        rawString: `#prisma
          @database.VarChar(255)
        `,
      }),
    })
    .map("pages_content_items");
});

export default pageContentItemModel;
