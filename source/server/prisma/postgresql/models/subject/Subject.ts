import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import schemixSubjectsOnClassesModel from "~backend/source/server/prisma/postgresql/models/subjectsOnClasses/SubjectsOnClasses";
import schemixSubjectTranslationsModel from "~backend/source/server/prisma/postgresql/models/subjectTranslations/SubjectTranslations";

const schemixSubjectModel: PrismaModel = createModel(
  (schemixSubjectModel: PrismaModel): void => {
    schemixSubjectModel
      .int("id", {
        id: true,
        raw: /* prisma */ ` 
            @default(autoincrement())
          `,
      })
      .relation("subjectTranslations", schemixSubjectTranslationsModel, {
        list: true,
      })
      .relation("classes", schemixSubjectsOnClassesModel, { list: true })
      .map("subjects");
  },
);

export default schemixSubjectModel;
