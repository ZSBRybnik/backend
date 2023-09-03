import { createModel } from "schemix";
import languagesEnum from "../../enums/languages/Languages";
import PostModel from "../post/Post";

const model = createModel((PostTranslationsModel) => {
  PostTranslationsModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: /* prisma */ `@default(auto()) @database.ObjectId`,
  })
    .int("id", { unique: true })
    .enum("language", languagesEnum)
    .string("title")
    .string("brief")
    .int("postId", {
      map: "post_id",
    })
    .relation("postTranslation", PostModel, {
      fields: ["postId"],
      references: ["id"],
    })
    .map("post_translations");
});

export default model;
