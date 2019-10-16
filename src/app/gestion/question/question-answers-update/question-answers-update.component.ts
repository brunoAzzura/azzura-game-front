import { QuestionService } from './../../../service/question.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AnswerService } from '../../../service/answer.service';

@Component({
  selector: 'app-question-answers-update',
  templateUrl: './question-answers-update.component.html',
  styleUrls: ['./question-answers-update.component.scss']
})
export class QuestionAnswersUpdateComponent implements OnInit {

  @Input() answers;
  @Input() questionId;
  @Output() answerDeleted: EventEmitter<string> = new EventEmitter();
  @Output() answerAdded: EventEmitter<string> = new EventEmitter();
  public currentAnswer;

  constructor(
    private _questionService: QuestionService,
    private _answerService: AnswerService
  ) { }

  ngOnInit() {
    this.currentAnswer = {};
  }

  addAnswer() {
    this._questionService.addQuestionAnswer(this.questionId, this.currentAnswer).subscribe(
        (res: any) => {
          this.answerAdded.emit(res);
          this.resetAnswerAdded();
        }
      );
  }

  deleteAnswer(answerId) {
      this._answerService.deleteAnswer(answerId).subscribe(
        (res: any) => {
          this.answerDeleted.emit(answerId);
        }
    );
  }

  resetAnswerAdded() {
    this.currentAnswer = {};
  }
}
