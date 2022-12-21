import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import schemixContentItemModel from "~backend/source/server/prisma/postgresql/models/contentItem/ContentItem";
import schemixPostModel from "~backend/source/server/prisma/postgresql/models/post/Post";
import schemixPageModel from "~backend/source/server/prisma/postgresql/models/subpage/Subpage";
import generatePrismaString from "~backend/source/server/prisma/utils/generatePrismaString/generatePrismaString";

const schemixContentItemsOnPostsAndSubpagesModel: PrismaModel = createModel(
  (ContentItemsOnPostsAndSubpagesModel: PrismaModel): void => {
    ContentItemsOnPostsAndSubpagesModel.int("id", {
      id: true,
      raw: generatePrismaString({
        rawString: `#prisma
          @default(autoincrement())
        `,
      }),
    })
      .map("content_items_on_posts_and_subpages")
      .relation("posts", schemixPostModel, {
        fields: ["postId"],
        optional: true,
        references: ["id"],
      })
      .relation("subpages", schemixPageModel, {
        fields: ["subpageName"],
        optional: true,
        references: ["name"],
      })
      .relation("contentItems", schemixContentItemModel, {
        fields: ["contentItemId"],
        references: ["id"],
      })
      .string("subpageName", {
        optional: true,
        map: "subpage_name",
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

export default schemixContentItemsOnPostsAndSubpagesModel;
