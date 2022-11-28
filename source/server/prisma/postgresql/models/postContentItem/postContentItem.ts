import { createModel, PrismaModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import postModel from "../post/Post";

const postContentItemModel: PrismaModel = createModel(
  (postContentItemModel: PrismaModel): void => {
    postContentItemModel
      .int("id", {
        raw: generatePrismaString({
          rawString: `#prisma
          @id @default(autoincrement())
        `,
        }),
      })
      .relation("content", postModel, {
        fields: ["contentId"],
        references: ["id"],
      })
      .int("contentId", {
        map: "content_id",
      })
      .string("runtime", {
        raw: generatePrismaString({
          rawString: `#prisma
          @database.VarChar(255)
        `,
        }),
      })
      .map("posts_content_items");
  },
);

export default postContentItemModel;
