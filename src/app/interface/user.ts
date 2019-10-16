import { WorldScore } from './world-score';
import { GoodToKnow } from './good-to-know';
import { Avatar } from './avatar';
export interface User {
  id: number;
  name: string;
  email: string;
  goodToKnow?: GoodToKnow[];
  username: string;
  roles: string[];
  ranking: number;
  image_profil_path: string;
  avatar: Avatar;
  world_scores?: WorldScore[];
}
