import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import SubiectOnClassModel from "../subjectsOnClasses/SubjectsOnClasses";
import UsersModel from "../user/User";
const model = createModel((ClassModel) => {
  ClassModel.int("id", {
    raw: generatePrismaString({
      rawString: `#prisma 
        @id @default(autoincrement())
      `,
    }),
  })
    .relation("users", UsersModel, { list: true })
    .relation("subjects", SubiectOnClassModel, { list: true })
    .string("name", {
      raw: generatePrismaString({
        rawString: `#prisma 
          @database.VarChar(255)
        `,
      }),
    })
    .map("classes");
});

export default model;
