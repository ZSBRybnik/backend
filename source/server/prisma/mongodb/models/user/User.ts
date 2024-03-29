import { createModel, PrismaModel } from "schemix";
import AuthenticationTypes from "~backend/source/server/constants/authenticationType/authenticationType";
import schemixAuthenticationType from "../../enums/authenticationType/AuthenticationType";
import rolesEnum from "../../enums/roles/Roles";
import userModifiers from "../../enums/userModifiers/UserModifiers";
import orderModel from "../order/Order";
import postModel from "../post/Post";
import classModel from "../schoolClass/SchoolClass";

const model: PrismaModel = createModel((UserModal: PrismaModel): void => {
  UserModal.string("mongo_id", {
    map: "_id",
    id: true,
    raw: /* prisma */ `@default(auto()) @database.ObjectId`.trim(),
  })
    .int("id", {
      unique: true,
    })
    .boolean("isDisabled", { map: "is_disabled" })
    .enum("modifiers", userModifiers, { list: true })
    .enum("roles", rolesEnum, { list: true })
    .enum("enabledTwoFactorAuthentication", schemixAuthenticationType, {
      default: AuthenticationTypes.Application,
      map: "enabled_two_factor_authentication",
    })
    .relation("class", classModel, {
      fields: ["classId"],
      references: ["id"],
    })
    .int("classId", {
      map: "class_id",
    })
    .relation("orders", orderModel, { list: true })
    .relation("posts", postModel, { list: true })
    .string("login", {
      unique: true,
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
    })
    .map("users");
});

export default model;
