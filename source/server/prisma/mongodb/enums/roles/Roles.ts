import type { PrismaEnum } from "schemix";
import { createEnum } from "schemix";
import Roles from "~backend/source/server/constants/roles/Roles";

const allRoles: Set<Roles> = new Set([
  Roles.Administrator,
  Roles.Student,
  Roles.BuffetOwner,
]);

const schemixRolesEnum: PrismaEnum = createEnum(
  (rolesEnum: PrismaEnum): void => {
    allRoles.forEach((role: Roles): void => {
      rolesEnum.addValue(role);
    });
  },
);

export default schemixRolesEnum;
