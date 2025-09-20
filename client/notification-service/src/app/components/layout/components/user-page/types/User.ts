import {UserRolesEnum} from '../../../../../services/auth/types/UserRolesEnum';

export type User = {
  user_id: number;
  user_name: string;
  user_email: string;
  role_id: UserRolesEnum;
  user_banned: boolean;
}
