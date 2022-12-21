import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import schemixPageModel from "~backend/source/server/prisma/postgresql/models/subpage/Subpage";
import schemixSubpageCategoryTranslationsModel from "~backend/source/server/prisma/postgresql/models/subpageCategoryTranslations/SubpageCategoryTranslations";
import generatePrismaString from "~backend/source/server/prisma/utils/generatePrismaString/generatePrismaString";

const schemixSubpageCategoryModel: PrismaModel = createModel(
  (schemixSubpageCategoryModel: PrismaModel): void => {
    schemixSubpageCategoryModel
      .int("id", {
        id: true,
        raw: generatePrismaString({
          rawString: `#prisma 
          @default(autoincrement())
      `,
        }),
      })
      .string("subpageName", {
        map: "subpage_name",
      })
      .relation("subpageCategory", schemixPageModel, {
        fields: ["subpageName"],
        references: ["name"],
      })
      .relation(
        "subpageCategoryTranslations",
        schemixSubpageCategoryTranslationsModel,
        {
          list: true,
        },
      )
      .map("subpages_category");
  },
);

export default schemixSubpageCategoryModel;
