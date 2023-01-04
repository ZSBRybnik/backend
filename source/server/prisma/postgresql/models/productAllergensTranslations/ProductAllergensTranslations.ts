import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import schemixLanguagesEnum from "~backend/source/server/prisma/postgresql/enums/languages/Languages";
import schemixProductAllergensModel from "~backend/source/server/prisma/postgresql/models/productAllergens/ProductAllergens";
import generatePrismaString from "~backend/source/server/prisma/utils/generatePrismaString/generatePrismaString";

const schemixProductAllergensTranslationsModel: PrismaModel = createModel(
  (schemixProductAllergensTranslationsModel: PrismaModel): void => {
    schemixProductAllergensTranslationsModel
      .int("id", {
        id: true,
        raw: generatePrismaString({
          rawString: `#prisma 
            @default(autoincrement())
          `,
        }),
      })
      .enum("language", schemixLanguagesEnum)
      .string("name")
      .int("allergenId", {
        map: "allergen_id",
      })
      .relation("allergenTranslation", schemixProductAllergensModel, {
        fields: ["allergenId"],
        references: ["id"],
      })
      .map("product_allergens_translations");
  },
);

export default schemixProductAllergensTranslationsModel;
