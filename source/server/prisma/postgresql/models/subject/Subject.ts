import { createModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import SubjectOnClassModel from "../subjectsOnClasses/SubjectsOnClasses";
import SubjectTranslationsModel from "../subjectTranslations/SubjectTranslations";

const model = createModel((SubjectModel) => {
  SubjectModel.int("id", {
    raw: generatePrismaString({
      rawString: `#prisma 
        @id @default(autoincrement())
      `,
    }),
  })
    .relation("subjectTranslations", SubjectTranslationsModel, { list: true })
    .relation("classes", SubjectOnClassModel, { list: true })
    .string("name", {
      raw: generatePrismaString({
        rawString: `#prisma 
          @database.VarChar(255)
        `,
      }),
    })
    .map("subjects");
});

export default model;
