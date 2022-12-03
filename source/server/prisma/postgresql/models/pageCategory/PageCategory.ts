import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import PageModel from "../page/Page";
import pageCategoryTranslationsModel from "../pageCategoryTranslations/PageCategoryTranslations";

const model = createModel((PageCategoryModel) => {
  PageCategoryModel.int("id", {
    raw: generatePrismaString({
      rawString: `#prisma 
        @id @default(autoincrement())
      `,
    }),
  })
    .int("pageName", {
      map: "page_name",
    })
    .relation("pageCategory", PageModel, {
      fields: ["pageName"],
      references: ["name"],
    })
    .relation("pageCategoryTranslations", pageCategoryTranslationsModel, {
      list: true,
    })
    .map("pages_category");
});

export default model;
