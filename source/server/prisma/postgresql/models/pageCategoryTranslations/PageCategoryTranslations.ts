import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import PageContentModel from "../pageCategory/PageCategory";

const model = createModel((SubjectTranslationsModel) => {
  SubjectTranslationsModel.int("id", {
    id: true,
    raw: generatePrismaString({
      rawString: `#prisma 
        @default(autoincrement())
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
    .int("pageCategoryId", {
      map: "page_category_id",
    })
    .relation("subjectTranslation", PageContentModel, {
      fields: ["pageCategoryId"],
      references: ["id"],
    })
    .map("page_category_translations");
});

export default model;
