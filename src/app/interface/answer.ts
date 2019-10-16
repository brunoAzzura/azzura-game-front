import { Question } from './question';
export interface Answer {
  id: number;
  wording: string;
  valid: boolean;
  question?: Question;
}
