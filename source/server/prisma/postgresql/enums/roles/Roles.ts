import { createEnum, PrismaEnum } from "schemix";
import Roles from "~backend/source/server/constants/roles/roles";

const allRoles: Set<Roles> = new Set([
  Roles.Administrator,
  Roles.Student,
  Roles.BuffetOwner,
]);

const roles: PrismaEnum = createEnum((rolesEnum: PrismaEnum): void => {
  allRoles.forEach((role: Roles): void => {
    rolesEnum.addValue(role);
  });
});

export default roles;
