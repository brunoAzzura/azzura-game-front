import { PuzzleGame } from './puzzle-game';

export interface PuzzlePiece {
  id: number;
  image_path: string;
  piece_order: number;
  puzzle_game?: PuzzleGame;
  rotate?: number;
}
