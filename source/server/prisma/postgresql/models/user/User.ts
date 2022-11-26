import { createModel, PrismaModel } from "schemix";
import generatePrismaString from "../../../utils/generatePrismaString/generatePrismaString";

const model: PrismaModel = createModel((UserModal: PrismaModel): void => {
  UserModal.int("id", {
    raw: generatePrismaString({
      rawString: `#prisma 
          @id @default(autoincrement())
      `,
    }),
  })
    .string("login", {
      unique: true,
      raw: generatePrismaString({
        rawString: `#prisma 
        @database.VarChar(255)
      `,
      }),
    })
    .string("role", {
      default: "user",
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
      raw: generatePrismaString({
        rawString: `#prisma 
        @database.VarChar(37)
      `,
      }),
    })
    .map("users");
});

export default model;
