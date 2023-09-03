import { createModel, PrismaModel } from "schemix";
import schemixLanguagesEnum from "~backend/source/server/prisma/postgresql/enums/languages/Languages";
import schemixSubpageModel from "../subpage/Subpage";

const schemixSubpageTranslationsModel: PrismaModel = createModel(
  (schemixSubpageTranslationsModel: PrismaModel): void => {
    schemixSubpageTranslationsModel
      .int("id", {
        id: true,
        raw: /* prisma */ `
        @default(autoincrement())
        `,
      })
      .enum("language", schemixLanguagesEnum)
      .string("subpageName", {
        raw: /* prisma */ `
            @database.VarChar(255)
          `,
      })
      .relation("subpageTranslation", schemixSubpageModel, {
        fields: ["subpageName"],
        references: ["name"],
      })
      .string("title", {
        raw: /* prisma */ ` 
            @database.VarChar(255)
          `,
      })
      .map("subpage_translations");
  },
);

export default schemixSubpageTranslationsModel;
