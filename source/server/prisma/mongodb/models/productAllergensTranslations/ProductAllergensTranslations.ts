import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import languagesEnum from "../../enums/languages/Languages";
import ProductAllergensModel from "../productAllergens/ProductAllergens";

const model = createModel((ProductAllergensTranslationsModel) => {
  ProductAllergensTranslationsModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: generatePrismaString({
      rawString: `#prisma 
        @default(auto()) @database.ObjectId
      `,
    }),
  })
    .int("id", { unique: true })
    .enum("language", languagesEnum)
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
