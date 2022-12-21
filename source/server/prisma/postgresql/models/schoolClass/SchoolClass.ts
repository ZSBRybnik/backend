import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import schemixSubjectsOnClassesModel from "~backend/source/server/prisma/postgresql/models/subjectsOnClasses/SubjectsOnClasses";
import schemixUserModel from "~backend/source/server/prisma/postgresql/models/user/User";
import generatePrismaString from "~backend/source/server/prisma/utils/generatePrismaString/generatePrismaString";

const schemixClassModel: PrismaModel = createModel(
  (schemixClassModel: PrismaModel): void => {
    schemixClassModel
      .int("id", {
        id: true,
        raw: generatePrismaString({
          rawString: `#prisma 
            @default(autoincrement())
          `,
        }),
      })
      .relation("users", schemixUserModel, { list: true })
      .relation("subjects", schemixSubjectsOnClassesModel, { list: true })
      .string("name", {
        raw: generatePrismaString({
          rawString: `#prisma 
            @database.VarChar(10)
          `,
        }),
      })
      .map("classes");
  },
);

export default schemixClassModel;
