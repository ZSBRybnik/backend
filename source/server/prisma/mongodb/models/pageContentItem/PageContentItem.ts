import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";

const pageContentItemModel = createModel((pageContentItemModel) => {
  pageContentItemModel
    .string("mongo_id", {
      map: "_id",
      raw: generatePrismaString({
        rawString: `#prisma 
          @id @default(auto()) @database.ObjectId
        `,
      }),
    })
    .int("id", {
      unique: true,
    })
    .string("content")
    .string("runtime")
    .map("pages_content_items");
});

export default pageContentItemModel;
