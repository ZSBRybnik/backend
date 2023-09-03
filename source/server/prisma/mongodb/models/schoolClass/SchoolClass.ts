import { createModel } from "schemix";
import SubjectsOnClassesModel from "../subjectOnClass/SubjectOnClass";
import UsersModel from "../user/User";

const classModel = createModel((SchoolClassModel) => {
  SchoolClassModel.string("mongo_id", {
    map: "_id",
    id: true,
    raw: /* prisma */ `@default(auto()) @database.ObjectId`.trim(),
  })
    .int("id", { unique: true })
    .relation("users", UsersModel, { list: true })
    .relation("subjects", SubjectsOnClassesModel, { list: true })
    .string("name", { unique: true })
    .map("classes");
});

export default classModel;
