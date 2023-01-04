import { createModel, PrismaModel } from "schemix";
import schemixLanguagesEnum from "~backend/source/server/prisma/postgresql/enums/languages/Languages";
import schemixSubpageCategoryModel from "~backend/source/server/prisma/postgresql/models/subpageCategory/SubpageCategory";
import generatePrismaString from "~backend/source/server/prisma/utils/generatePrismaString/generatePrismaString";

const schemixSubpageCategoryTranslationsModel: PrismaModel = createModel(
  (SubjectTranslationsModel: PrismaModel): void => {
    SubjectTranslationsModel.int("id", {
      id: true,
      raw: generatePrismaString({
        rawString: `#prisma 
          @default(autoincrement())
        `,
      }),
    })
      .enum("language", schemixLanguagesEnum)
      .string("name", {
        raw: generatePrismaString({
          rawString: `#prisma 
            @database.VarChar(255)
          `,
        }),
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
