import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import postAndPageModifiers from "../../enums/postAndPageModifiers/PostAndPageModifiers";
import contentItemsOnPostsAndSupbages from "../contentItemsOnPostsAndSubpages/ContentItemsOnPostsAndSubpages";
import PageCategoryModel from "../pageCategory/PageCategory";

const pageModel = createModel((pageModel) => {
  pageModel
    .boolean("isDisabled", { map: "is_disabled" })
    .string("name", {
      id: true,
      raw: generatePrismaString({
        rawString: `#prisma 
          @database.VarChar(255)
        `,
      }),
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
    .string("title", {
      raw: generatePrismaString({
        rawString: `#prisma 
          @database.VarChar(255)
        `,
      }),
    })
    .map("pages");
});

export default pageModel;
