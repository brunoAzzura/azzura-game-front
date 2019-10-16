import { User } from './user';
import { Avatar } from './avatar';

export interface UserAvatar {
  id: number;
  actif: boolean;
  user: User;
  avatar: Avatar;
}
