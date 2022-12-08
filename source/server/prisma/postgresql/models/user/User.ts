import { createModel, PrismaModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";
import authenticationType, {
  AuthenticationTypes,
} from "../../enums/authenticationType/AuthenticationType";
import rolesEnum from "../../enums/roles/Roles";
import userModifiers from "../../enums/userModifiers/UserModifiers";
import ClassModel from "../class/Class";
import postModel from "../post/Post";

const UserModel: PrismaModel = createModel((UserModel: PrismaModel): void => {
  UserModel.int("id", {
    id: true,
    raw: generatePrismaString({
      rawString: `#prisma 
        @default(autoincrement())
      `,
    }),
  })
    .boolean("isDisabled", { map: "is_disabled" })
    .enum("modifiers", userModifiers, { list: true })
    .enum("roles", rolesEnum, { list: true })
    .enum("enabledTwoFactorAuthentication", authenticationType, {
      default: AuthenticationTypes.Application,
      map: "enabled_two_factor_authentication",
    })
    .relation("class", ClassModel, {
      fields: ["classId"],
      references: ["id"],
    })
    .int("classId", {
      map: "class_id",
    })
    .relation("posts", postModel, { list: true })
    .string("login", {
      unique: true,
      raw: generatePrismaString({
        rawString: `#prisma 
          @database.VarChar(255)
        `,
      }),
    })
    .string("password", {
      raw: generatePrismaString({
        rawString: `#prisma 
          @database.VarChar(255)
        `,
      }),
    })
    .string("email", {
      unique: true,
      raw: generatePrismaString({
        rawString: `#prisma 
          @database.VarChar(255)
        `,
      }),
    })
    .string("authenticatorCode", {
      optional: true,
      raw: generatePrismaString({
        rawString: `#prisma 
          @database.VarChar(16)
        `,
      }),
      map: "authenticator_code",
    })
    .string("phoneNumber", {
      optional: true,
      raw: generatePrismaString({
        rawString: `#prisma 
          @database.VarChar(22)
        `,
      }),
      map: "phone_number",
    })
    .int("lockerNumber", {
      unique: true,
      optional: true,
      map: "locker_number",
    })
    .int("lockerPin", {
      optional: true,
      map: "locker_pin",
    })
    .string("discordId", {
      unique: true,
      map: "discord_id",
      raw: generatePrismaString({
        rawString: `#prisma 
          @database.VarChar(18)
        `,
      }),
    })
    .map("users");
});

export default UserModel;
