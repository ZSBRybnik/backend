import { createModel } from "schemix";
import PageModel from "../page/Page";
import pageCategoryTranslationsModel from "../pageCategoryTranslations/PageCategoryTranslations";

const model = createModel((PageCategoryModel) => {
  PageCategoryModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: /* prisma */ `@default(auto()) @database.ObjectId`.trim(),
  })
    .int("id", { unique: true })
    .string("pageName", {
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
