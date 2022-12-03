import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import ProductAllergensTranslationsModel from "../productAllergensTranslations/ProductAllergensTranslations";

const model = createModel((ProductAllergensModel) => {
  ProductAllergensModel.int("id", {
    id: true,
    raw: generatePrismaString({
      rawString: `#prisma 
        @default(autoincrement())
      `,
    }),
  })
    .relation(
      "productAllergenTranslations",
      ProductAllergensTranslationsModel,
      {
        list: true,
      },
    )
    .map("product_allergens");
});

export default model;
