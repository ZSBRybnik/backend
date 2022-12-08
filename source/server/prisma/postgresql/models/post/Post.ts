import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import postAndPageModifiers from "../../enums/postAndPageModifiers/PostAndPageModifiers";
import contentItemsOnPostsAndSupbages from "../contentItemsOnPostsAndSubpages/ContentItemsOnPostsAndSubpages";
import PostTranslationsModel from "../postTranstations/PostTranslations";
import UserModel from "../user/User";

const postModel = createModel((postModel) => {
  postModel
    .int("id", {
      raw: generatePrismaString({
        rawString: `#prisma 
          @id @default(autoincrement())
        `,
      }),
    })
    .boolean("isDisabled", { map: "is_disabled" })
    .enum("modifiers", postAndPageModifiers, { list: true })
    .relation("postTranslations", PostTranslationsModel, {
      list: true,
    })
    .string("title", {
      raw: generatePrismaString({
        rawString: `#prisma 
          @database.VarChar(255)
        `,
      }),
    })
    .relation(
      "content_items_on_posts_and_supbages",
      contentItemsOnPostsAndSupbages,
      {
        list: true,
      },
    )
    .relation("author", UserModel, {
      fields: ["authorId"],
      references: ["id"],
    })
    .int("authorId", {
      map: "author_id",
    })
    .string("brief", {
      raw: generatePrismaString({
        rawString: `#prisma 
          @database.VarChar(255)
        `,
      }),
    })
    .map("posts");
});

export default postModel;
