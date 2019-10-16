import { MemoryCard } from './memory-card';
import { GameType } from './game-type';
import { Question } from './question';
import { ThemeDraw } from './theme-draw';
import { World } from './world';
import { PuzzleGame } from './puzzle-game';
export interface Theme {
  id: number;
  wording: string;
  description: string;
  world?: World;
  ranking: number;
  theme_draw: ThemeDraw;
  game_type: GameType;
  questions?: Question[];
  memory_cards?: MemoryCard[];
  puzzle_game?: PuzzleGame;
}
