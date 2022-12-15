import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import productModel from "../product/Product";
import productAllergensModel from "../productAllergens/ProductAllergens";

const allergensOnProducts = createModel((allergensOnProductsModel) => {
  allergensOnProductsModel
    .string("mongo_id", {
      map: "_id",
      id: true,
      raw: generatePrismaString({
        rawString: `#prisma 
        @default(auto()) @database.ObjectId
      `,
      }),
    })
    .map("allergens_on_products")
    .relation("allergens", productAllergensModel, {
      fields: ["allergenId"],
      references: ["id"],
    })
    .relation("products", productModel, {
      fields: ["productId"],
      references: ["id"],
    })
    .int("productId", {
      map: "product_id",
    })
    .int("allergenId", {
      map: "allergen_id",
    });
});

export default allergensOnProducts;
