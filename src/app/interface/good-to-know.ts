import { User } from './user';
import { Theme } from './theme';

export interface GoodToKnow {
  id: number;
  path: string;
  type: string;
  wording: string;
  users: User[];
  theme: Theme;
  info: string;
}
