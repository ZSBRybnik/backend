import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import schemixAllergensOnProductsModel from "~backend/source/server/prisma/postgresql/models/allergensOnProducts/AllergensOnProducts";
import schemixProductAllergensTranslationsModel from "~backend/source/server/prisma/postgresql/models/productAllergensTranslations/ProductAllergensTranslations";

const schemixProductAllergensModel: PrismaModel = createModel(
  (schemixProductAllergensModel: PrismaModel): void => {
    schemixProductAllergensModel
      .int("id", {
        id: true,
        raw: /* prisma */ ` 
            @default(autoincrement())
          `,
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
