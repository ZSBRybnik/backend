import { createModel, PrismaModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";

const model: PrismaModel = createModel((UserModal: PrismaModel): void => {
  UserModal.string("mongo_id", {
    map: "_id",
    raw: generatePrismaString({
      rawString: `#prisma 
       @id @default(auto()) @database.ObjectId
      `,
    }),
  })
    .int("id", {
      unique: true,
    })
    .string("login", {
      unique: true,
    })
    .string("role", {
      default: "user",
    })
    .string("password")
    .string("email", {
      unique: true,
    })
    .string("authenticatorCode", {
      optional: true,
      map: "authenticator_code",
    })
    .string("phoneNumber", {
      optional: true,
      map: "phone_number",
    })
    .string("enabledTwoFactorAuthentication", {
      default: "application",
      map: "enabled_two_factor_authentication",
    })
    .int("lockerNumber", {
      unique: true,
      optional: true,
      map: "locker_number",
    })
    .int("lockerNumber", {
      optional: true,
      map: "locker_pin",
    })
    .string("discordNickname", {
      map: "discord_nickname",
    })
    .map("users");
});

export default model;
