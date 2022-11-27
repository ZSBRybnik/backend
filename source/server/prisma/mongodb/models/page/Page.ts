import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";

const pageModel = createModel((pageModel) => {
  pageModel
    .string("mongo_id", {
      map: "_id",
      raw: generatePrismaString({
        rawString: `#prisma 
          @id @default(auto()) @database.ObjectId
        `,
      }),
    })
    .string("name", {
      unique: true,
    })
    .string("title")
    .map("pages");
});

export default pageModel;
