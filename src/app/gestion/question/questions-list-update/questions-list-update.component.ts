import { QuestionService } from './../../../service/question.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-questions-list-update',
  templateUrl: './questions-list-update.component.html',
  styleUrls: ['./questions-list-update.component.scss']
})
export class QuestionsListUpdateComponent implements OnInit {

  public BASE_PATH = environment.apiGameUrl;

  @Input() questions;
  @Output()
  questionSelected: EventEmitter<string> = new EventEmitter();
  @Output()
  questionDeleted: EventEmitter<string> = new EventEmitter();

  constructor(
    private _questionService: QuestionService
  ) { }

  ngOnInit() {
  }

  displayFormUpdateQuestion(question) {
    this.questionSelected.emit(question);
  }

  deleteQuestion(questionId) {
    this._questionService.deleteQuestion(questionId).subscribe(
      (res) => {
        this.questionDeleted.emit(questionId);
      }

    );
  }
}
