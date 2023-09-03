import { createModel, PrismaModel } from "schemix";
import AuthenticationType from "~backend/source/server/constants/authenticationType/authenticationType";
import authenticationType from "~backend/source/server/prisma/postgresql/enums/authenticationType/AuthenticationType";
import schemixRolesEnum from "~backend/source/server/prisma/postgresql/enums/roles/Roles";
import schemixUserModifiers from "~backend/source/server/prisma/postgresql/enums/userModifiers/UserModifiers";
import schemixOrderModel from "~backend/source/server/prisma/postgresql/models/order/Order";
import schemixPostModel from "~backend/source/server/prisma/postgresql/models/post/Post";
import schemixClassModel from "~backend/source/server/prisma/postgresql/models/schoolClass/SchoolClass";

const schemixUserModel: PrismaModel = createModel(
  (UserModel: PrismaModel): void => {
    UserModel.int("id", {
      id: true,
      raw: /* prisma */ `
          @default(autoincrement())
      `,
    })
      .boolean("isDisabled", { map: "is_disabled" })
      .enum("modifiers", schemixUserModifiers, { list: true })
      .enum("roles", schemixRolesEnum, { list: true })
      .enum("enabledTwoFactorAuthentication", authenticationType, {
        default: AuthenticationType.Application,
        map: "enabled_two_factor_authentication",
      })
      .relation("class", schemixClassModel, {
        fields: ["classId"],
        references: ["id"],
      })
      .int("classId", {
        map: "class_id",
      })
      .relation("posts", schemixPostModel, { list: true })
      .relation("orders", schemixOrderModel, { list: true })
      .string("login", {
        unique: true,
        raw: /* prisma */ `
            @database.VarChar(255)
        `,
      })
      .string("password", {
        raw: /* prisma */ `
            @database.VarChar(255)
        `,
      })
      .string("email", {
        unique: true,
        raw: /* prisma */ `
            @database.VarChar(255)
        `,
      })
      .string("authenticatorCode", {
        optional: true,
        raw: /* prisma */ `
            @database.VarChar(16)
        `,
        map: "authenticator_code",
      })
      .string("phoneNumber", {
        optional: true,
        raw: /* prisma */ ` 
            @database.VarChar(22)
        `,
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
        raw: /* prisma */ `
            @database.VarChar(18)
        `,
      })
      .map("users");
  },
);

export default schemixUserModel;
