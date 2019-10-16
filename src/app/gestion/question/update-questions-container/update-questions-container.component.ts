import { ThemeService } from './../../../service/theme.service';
import { ChallengeService } from './../../../service/challenge.service';

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-update-questions-container',
  templateUrl: './update-questions-container.component.html',
  styleUrls: ['./update-questions-container.component.scss']
})
export class UpdateQuestionsContainerComponent implements OnInit {
  @Input() challengeId;
  @Input() themeId;
  public questions;
  public question;

  constructor(
    private _challengeService: ChallengeService,
    private _themeService: ThemeService
  ) { }

  ngOnInit() {
    this.question = {};

    if (this.challengeId) {
      this._challengeService.getChallengeQuestions(this.challengeId).subscribe(
        (res) => {
          this.questions = res;
        }
      );
    } else if (this.themeId) {
      this._themeService.getThemeQuestions(this.themeId).subscribe(
        (res) => {
          this.questions = res;
        }
      );
    }

  }

  updateQuestion(question) {
    this.questions.find(item => item.id === question.id);
    this.question = question;
  }

  addQuestionList(question) {
    this.questions.push(question);
    this.updateQuestion(question);
  }

  updateQuestionList(question) {
    const itemIndex = this.questions.findIndex(item => item.id === question.id);
    this.questions[itemIndex] = question;
    this.updateQuestion(question);
  }

  deleteQuestionList(questionId) {
    this.questions = this.questions.filter(question => question.id !== questionId);
  }

  unselectQuestion() {
    this.question = {};
  }

  updateQuestionAddAnswer(answer) {
    if (this.question.answers !== null) {
      this.question.answers.push(answer);
    } else {
      this.question.answers = [answer];
    }
    const itemIndex = this.questions.findIndex(item => item.id === this.question.id);
    this.questions[itemIndex] = this.question;
  }

  updateQuestionRemoveAnswer(answerId) {
    const itemIndex = this.questions.findIndex(item => item.id === this.question.id);
    this.question.answers = this.question.answers.filter(answer => answer.id !== answerId);
    this.questions[itemIndex] = this.question;
  }

}
