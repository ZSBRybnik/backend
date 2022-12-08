import { createEnum } from "schemix";

const roles: Set<string> = new Set(["Administrator", "BuffetOwner"]);

const rolesEnum = createEnum((RolesEnum) => {
  roles.forEach((role) => {
    RolesEnum.addValue(role);
  });
});

export default rolesEnum;
