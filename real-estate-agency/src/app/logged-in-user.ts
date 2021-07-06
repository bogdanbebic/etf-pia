import { UserRoles } from "./user-roles.enum";

export interface LoggedInUser {
  username: string;
  role: UserRoles;
}
