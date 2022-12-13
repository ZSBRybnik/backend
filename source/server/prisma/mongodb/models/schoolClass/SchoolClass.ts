import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import UsersModel from "../user/User";
const classModel = createModel((SchoolClassModel) => {
  SchoolClassModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: generatePrismaString({
      rawString: `#prisma 
        @default(auto()) @database.ObjectId
      `,
    }),
  })
    .int("id", { unique: true })
    .relation("users", UsersModel, { list: true })
    //.relation("subjects", SubiectOnClassModel, { list: true })
    .string("name", { unique: true })
    .map("classes");
});

export default classModel;
