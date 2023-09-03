import { createModel, PrismaModel } from "schemix";
import schemixLanguagesEnum from "~backend/source/server/prisma/postgresql/enums/languages/Languages";
import schemixSubpageCategoryModel from "~backend/source/server/prisma/postgresql/models/subpageCategory/SubpageCategory";

const schemixSubpageCategoryTranslationsModel: PrismaModel = createModel(
  (SubjectTranslationsModel: PrismaModel): void => {
    SubjectTranslationsModel.int("id", {
      id: true,
      raw: /* prisma */ `
        @default(autoincrement())
      `.trim(),
    })
      .enum("language", schemixLanguagesEnum)
      .string("name", {
        raw: /* prisma */ `
          @database.VarChar(255)
        `.trim(),
      })
      .int("subpageCategoryId", {
        map: "subpage_category_id",
      })
      .relation("subpageCategory", schemixSubpageCategoryModel, {
        fields: ["subpageCategoryId"],
        references: ["id"],
      })
      .map("subpage_category_translations");
  },
);

export default schemixSubpageCategoryTranslationsModel;
