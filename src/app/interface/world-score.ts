import { World } from './world';
import { User } from './user';
export interface WorldScore {
  id: number;
  score: number;
  world: World;
  user: User;
  completed: boolean;
}
