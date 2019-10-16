
export interface WorldDraw {
  id: number;
  position_x: number;
  position_y: number;
  image_path: string;
  logo_path: string;
  background: string;
}

export class WorldDrawClass implements WorldDraw {
  id = null;
  position_x  = 0;
  position_y = 0;
  image_path = '';
  logo_path = '';
  background = '';
}
