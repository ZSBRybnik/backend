import { createModel } from "schemix";
import contentItemModel from "../contentItem/ContentItem";
import pageModel from "../page/Page";
import postModel from "../post/Post";

const contentItemsOnPostsAndSupbages = createModel(
  (ContentItemsOnPostsAndSupbagesModel) => {
    ContentItemsOnPostsAndSupbagesModel.id({
      fields: ["pageName", "contentItemId", "postId"],
    })
      .map("content_items_on_posts_and_subpages")
      .relation("posts", postModel, {
        fields: ["postId"],
        references: ["id"],
      })
      .relation("pages", pageModel, {
        fields: ["pageName"],
        references: ["name"],
      })
      .relation("contentItems", contentItemModel, {
        fields: ["contentItemId"],
        references: ["id"],
      })
      .string("pageName", {
        map: "page_name",
      })
      .int("contentItemId", {
        map: "content_item_id",
      })
      .int("postId", {
        map: "post_id",
      });
  },
);

export default contentItemsOnPostsAndSupbages;
