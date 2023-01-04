import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import allergensOnProducts from "../allergensOnProducts/AllergensOnProducts";
import ProductAllergensTranslationsModel from "../productAllergensTranslations/ProductAllergensTranslations";

const productAllergensModel = createModel((ProductAllergensModel) => {
  ProductAllergensModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: generatePrismaString({
      rawString: `#prisma 
        @default(auto()) @database.ObjectId
      `,
    }),
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
