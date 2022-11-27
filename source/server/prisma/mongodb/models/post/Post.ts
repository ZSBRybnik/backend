import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import UserModel from "../user/User";

const postModel = createModel((postModel) => {
  postModel
    .string("mongo_id", {
      map: "_id",
      raw: generatePrismaString({
        rawString: `#prisma 
          @id @default(auto()) @database.ObjectId
        `,
      }),
    })
    .int("id", {
      unique: true,
    })
    .string("title")
    .relation("author", UserModel, {
      fields: ["authorId"],
      references: ["id"],
    })
    .int("authorId", {
      map: "author_id",
    })
    .string("brief")
    .map("posts");
});

export default postModel;
