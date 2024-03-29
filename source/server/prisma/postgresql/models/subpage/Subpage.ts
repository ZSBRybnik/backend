import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import schemixPostAndSubpageModifiersEnum from "~backend/source/server/prisma/postgresql/enums/postAndSubpageModifiers/PostAndSubpageModifiers";
import schemixContentItemsOnPostsAndSubpagesModel from "~backend/source/server/prisma/postgresql/models/contentItemsOnPostsAndSubpages/ContentItemsOnPostsAndSubpages";
import schemixPageCategoryModel from "~backend/source/server/prisma/postgresql/models/subpageCategory/SubpageCategory";
import schemixSubpageTranslationsModel from "~backend/source/server/prisma/postgresql/models/subpageTranslations/SubpageTranslations";

const schemixSubpageModel: PrismaModel = createModel(
  (schemixSubpageModel: PrismaModel): void => {
    schemixSubpageModel
      .boolean("isDisabled", { map: "is_disabled" })
      .string("name", {
        id: true,
        raw: /* prisma */ `
          @database.VarChar(255)
        `.trim(),
      })
      .enum("modifiers", schemixPostAndSubpageModifiersEnum, { list: true })
      .relation(
        "contentItemsOnPostsAndSubpages",
        schemixContentItemsOnPostsAndSubpagesModel,
        {
          list: true,
        },
      )
      .relation("subpageCategory", schemixPageCategoryModel, {
        list: true,
      })
      .relation("subpageTranslations", schemixSubpageTranslationsModel, {
        list: true,
      })
      .map("subpages");
  },
);

export default schemixSubpageModel;
