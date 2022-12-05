import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import languagesEnum from "../../enums/languages/Languages";
import PostModel from "../post/Post";

const model = createModel((PostTranslationsModel) => {
  PostTranslationsModel.int("id", {
    id: true,
    raw: generatePrismaString({
      rawString: `#prisma 
        @default(autoincrement())
      `,
    }),
  })
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
