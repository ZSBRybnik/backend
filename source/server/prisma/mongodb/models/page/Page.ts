import { createModel } from "schemix";
import postAndSubpageModifiers from "../../enums/postAndSubpageModifiers/PostAndSubpageModifiers";
import contentItemsOnPostsAndSubpages from "../contentItemsOnPostsAndSubpages/ContentItemsOnPostsAndSubpages";
import PageCategoryModel from "../pageCategory/PageCategory";

const pageModel = createModel((pageModel) => {
  pageModel
    .string("mongo_id", {
      map: "_id",
      id: true,
      raw: /* prisma */ `@default(auto()) @database.ObjectId`,
    })
    .boolean("isDisabled", { map: "is_disabled" })
    .string("name", {
      unique: true,
    })
    .enum("modifiers", postAndSubpageModifiers, { list: true })
    .relation(
      "contentItemsOnPostsAndSubpages",
      contentItemsOnPostsAndSubpages,
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
