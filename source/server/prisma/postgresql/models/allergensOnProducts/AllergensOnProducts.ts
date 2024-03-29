import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import schemixProductAllergensModel from "~backend/source/server/prisma/postgresql/models/productAllergens/ProductAllergens";
import schemixProductModel from "~frontend/../backend/source/server/prisma/postgresql/models/product/Product";

const schemixAllergensOnProductsModel: PrismaModel = createModel(
  (schemixAllergensOnProductsModel: PrismaModel): void => {
    schemixAllergensOnProductsModel
      .id({
        fields: ["productId", "allergenId"],
      })
      .map("allergens_on_products_model")
      .relation("allergens", schemixProductAllergensModel, {
        fields: ["allergenId"],
        references: ["id"],
      })
      .relation("products", schemixProductModel, {
        fields: ["productId"],
        references: ["id"],
      })
      .int("productId", {
        map: "product_id",
      })
      .int("allergenId", {
        map: "allergen_id",
      });
  },
);

export default schemixAllergensOnProductsModel;
