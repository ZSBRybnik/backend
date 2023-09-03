import { createModel } from "schemix";
import contentItemModel from "../contentItem.ts/ContentItem";
import pageModel from "../page/Page";
import postModel from "../post/Post";

const contentItemsOnPostsAndSupbages = createModel(
  (ContentItemsOnPostsAndSupbagesModel) => {
    ContentItemsOnPostsAndSupbagesModel.string("mongo_id", {
      map: "_id",
      id: true,
      raw: /* prisma */ `@default(auto()) @database.ObjectId`,
    })
      .int("id", { unique: true })
      .map("content_items_on_posts_and_subpages")
      .relation("posts", postModel, {
        fields: ["postId"],
        optional: true,
        references: ["id"],
      })
      .relation("pages", pageModel, {
        fields: ["pageName"],
        optional: true,
        references: ["name"],
      })
      .relation("contentItems", contentItemModel, {
        fields: ["contentItemId"],
        references: ["id"],
      })
      .string("pageName", {
        optional: true,
        map: "page_name",
      })
      .int("contentItemId", {
        map: "content_item_id",
      })
      .int("postId", {
        optional: true,
        map: "post_id",
      });
  },
);

export default contentItemsOnPostsAndSupbages;
