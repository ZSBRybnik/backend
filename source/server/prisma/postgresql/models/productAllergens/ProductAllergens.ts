import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import allergensOnProducts from "../allergensOnProducts/AllergensOnProducts";
import ProductAllergensTranslationsModel from "../productAllergensTranslations/ProductAllergensTranslations";

const productAllergensModel = createModel((ProductAllergensModel) => {
  ProductAllergensModel.int("id", {
    id: true,
    raw: generatePrismaString({
      rawString: `#prisma 
        @default(autoincrement())
      `,
    }),
  })
    .relation("allergensOnProducts", allergensOnProducts, {
      list: true,
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

export default productAllergensModel;
