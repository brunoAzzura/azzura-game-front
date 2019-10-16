import { Answer } from './answer';
import { Theme } from './theme';
export interface Question {
  id: number;
  wording: String;
  theme?: Theme;
  answers: Answer[];
  complement: string;
  image_path?: string;
}

export class QuestionClass {

  id: number;
  wording: string;
  theme?: Theme;
  answers: Answer[];
  complement: string;
  image_path?: string;

  constructor(
    id?: number,
    wording?: string,
    answers?: Answer[],
    theme?: Theme,
    image_path?: string,
    complement?: string
  ) {  }
}
