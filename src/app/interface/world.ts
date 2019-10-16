import { WorldDraw } from './world-draw';
import { Theme } from './theme';
export interface World {
  id: number;
  wording: string;
  description: string;
  ranking: number;
  themes: Theme[];
  world_draw: WorldDraw;
}
