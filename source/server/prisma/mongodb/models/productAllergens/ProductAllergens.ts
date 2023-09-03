import { createModel } from "schemix";
import allergensOnProducts from "../allergensOnProducts/AllergensOnProducts";
import ProductAllergensTranslationsModel from "../productAllergensTranslations/ProductAllergensTranslations";

const productAllergensModel = createModel((ProductAllergensModel) => {
  ProductAllergensModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: /* prisma */ `@default(auto()) @database.ObjectId`.trim(),
  })
    .int("id", {
      unique: true,
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
