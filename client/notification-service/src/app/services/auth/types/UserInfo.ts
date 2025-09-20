import {UserRolesEnum} from './UserRolesEnum';

export interface UserInfo {
  id: number;
  roleId: UserRolesEnum;
  username: string;
}
