import { createModel, PrismaModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import pageModel from "../page/Page";

const pageContentItemModel: PrismaModel = createModel(
  (pageContentItemModel: PrismaModel): void => {
    pageContentItemModel
      .int("id", {
        raw: generatePrismaString({
          rawString: `#prisma
        @id @default(autoincrement())
      `,
        }),
      })
      .relation("content", pageModel, {
        fields: ["contentName"],
        references: ["name"],
      })
      .string("contentName", {
        map: "content_name",
      })
      .string("runtime", {
        raw: generatePrismaString({
          rawString: `#prisma
          @database.VarChar(255)
        `,
        }),
      })
      .map("pages_content_items");
  },
);

export default pageContentItemModel;
