import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import postAndPageModifiers from "../../enums/postAndPageModifiers/PostAndPageModifiers";
import contentItemsOnPostsAndSupbages from "../contentItemsOnPostsAndSupbages/ContentItemsOnPostsAndSupbages";
import PageCategoryModel from "../pageCategory/PageCategory";

const pageModel = createModel((pageModel) => {
  pageModel
    .string("mongo_id", {
      map: "_id",
      id: true,
      raw: generatePrismaString({
        rawString: `#prisma 
          @default(auto()) @database.ObjectId
        `,
      }),
    })
    .boolean("isDisabled", { map: "is_disabled" })
    .string("name", {
      unique: true,
    })
    .enum("modifiers", postAndPageModifiers, { list: true })
    .relation(
      "content_items_on_posts_and_supbages",
      contentItemsOnPostsAndSupbages,
      {
        list: true,
      },
    )
    .relation("pageCategory", PageCategoryModel, {
      list: true,
    })
    .string("title")
    .map("pages");
});

export default pageModel;
