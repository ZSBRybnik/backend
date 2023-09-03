import { createModel } from "schemix";
import languagesEnum from "../../enums/languages/Languages";
import PageContentModel from "../pageCategory/PageCategory";

const model = createModel((SubjectTranslationsModel) => {
  SubjectTranslationsModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: /* prisma */ `@default(auto()) @database.ObjectId`.trim(),
  })
    .int("id", { unique: true })
    .enum("language", languagesEnum)
    .string("name")
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
