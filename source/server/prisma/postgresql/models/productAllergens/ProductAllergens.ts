import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import schemixAllergensOnProductsModel from "~backend/source/server/prisma/postgresql/models/allergensOnProducts/AllergensOnProducts";
import schemixProductAllergensTranslationsModel from "~backend/source/server/prisma/postgresql/models/productAllergensTranslations/ProductAllergensTranslations";
import generatePrismaString from "~backend/source/server/prisma/utils/generatePrismaString/generatePrismaString";

const schemixProductAllergensModel: PrismaModel = createModel(
  (schemixProductAllergensModel: PrismaModel): void => {
    schemixProductAllergensModel
      .int("id", {
        id: true,
        raw: generatePrismaString({
          rawString: `#prisma 
            @default(autoincrement())
          `,
        }),
      })
      .relation("allergensOnProducts", schemixAllergensOnProductsModel, {
        list: true,
      })
      .relation(
        "productAllergenTranslations",
        schemixProductAllergensTranslationsModel,
        {
          list: true,
        },
      )
      .map("product_allergens");
  },
);

export default schemixProductAllergensModel;
