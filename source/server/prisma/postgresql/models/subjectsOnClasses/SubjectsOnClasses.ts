import type { PrismaModel } from "schemix";
import { createModel } from "schemix";
import schemixClassModel from "~backend/source/server/prisma/postgresql/models/schoolClass/SchoolClass";
import schemixSubjectModel from "~backend/source/server/prisma/postgresql/models/subject/Subject";

const schemixSubjectsOnClassesModel: PrismaModel = createModel(
  (schemixSubjectsOnClassesModel: PrismaModel): void => {
    schemixSubjectsOnClassesModel
      .id({
        fields: ["classId", "subjectId"],
      })
      .map("subjects_on_classes")
      .relation("classes", schemixClassModel, {
        fields: ["classId"],
        references: ["id"],
      })
      .relation("subjects", schemixSubjectModel, {
        fields: ["subjectId"],
        references: ["id"],
      })
      .int("classId", {
        map: "class_id",
      })
      .int("subjectId", {
        map: "subject_id",
      });
  },
);

export default schemixSubjectsOnClassesModel;
