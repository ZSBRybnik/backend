import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";

const pageModel = createModel((pageModel) => {
  pageModel
    .string("name", {
      unique: true,
      raw: generatePrismaString({
        rawString: `#prisma 
          @id @db.VarChar(255)
      `,
      }),
    })
    .string("title")
    .map("pages");
});

export default pageModel;
