import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import schemixSubjectsOnClassesModel from "~backend/source/server/prisma/postgresql/models/subjectsOnClasses/SubjectsOnClasses";
import schemixUserModel from "~backend/source/server/prisma/postgresql/models/user/User";

const schemixClassModel: PrismaModel = createModel(
  (schemixClassModel: PrismaModel): void => {
    schemixClassModel
      .int("id", {
        id: true,
        raw: /* prisma */ ` 
          @default(autoincrement())
        `.trim(),
      })
      .relation("users", schemixUserModel, { list: true })
      .relation("subjects", schemixSubjectsOnClassesModel, { list: true })
      .string("name", {
        raw: /* prisma */ ` 
          @database.VarChar(10)
        `.trim(),
      })
      .map("classes");
  },
);

export default schemixClassModel;
