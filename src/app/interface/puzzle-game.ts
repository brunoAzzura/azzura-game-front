import { PuzzlePiece } from './puzzle-piece';
export interface PuzzleGame {
  id: number;
  time_limit: number;
  nb_cases: number;
  image_puzzle_path: string;
  puzzle_pieces: PuzzlePiece[];
}
