import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import contentItemModel from "../contentItem/ContentItem";
import pageModel from "../page/Page";
import postModel from "../post/Post";

const contentItemsOnPostsAndSupbages = createModel(
  (ContentItemsOnPostsAndSupbagesModel) => {
    ContentItemsOnPostsAndSupbagesModel.int("id", {
      id: true,
      raw: generatePrismaString({
        rawString: `#prisma
            @default(autoincrement())
          `,
      }),
    })
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
