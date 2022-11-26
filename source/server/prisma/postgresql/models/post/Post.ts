import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
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
    .string("title", {
      raw: generatePrismaString({
        rawString: `#prisma 
         @database.VarChar(255)
      `,
      }),
    })
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
