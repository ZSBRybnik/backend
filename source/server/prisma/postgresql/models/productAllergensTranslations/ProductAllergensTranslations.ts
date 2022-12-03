import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import ProductAllergensModel from "../productAllergens/ProductAllergens";

const model = createModel((ProductAllergensTranslationsModel) => {
  ProductAllergensTranslationsModel.int("id", {
    id: true,
    raw: generatePrismaString({
      rawString: `#prisma 
        @default(autoincrement())
      `,
    }),
  })
    .string("language")
    .string("name")
    .int("allergenId", {
      map: "allergen_id",
    })
    .relation("allergenTranslation", ProductAllergensModel, {
      fields: ["allergenId"],
      references: ["id"],
    })
    .map("product_allergens_translations");
});

export default model;
