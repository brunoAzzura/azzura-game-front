import { Theme } from './theme';
export interface ThemeDraw {
  id: number;
  position_x: number;
  position_y: number;
  width: number;
  theme?: Theme;
  image_path: string;
  image_success_path: string;
  image_error_path: string;
}
