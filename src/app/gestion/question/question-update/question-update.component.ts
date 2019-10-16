import { ThemeService } from './../../../service/theme.service';
import { QuestionService } from './../../../service/question.service';
import { ChallengeService } from './../../../service/challenge.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-update',
  templateUrl: './question-update.component.html',
  styleUrls: ['./question-update.component.scss']
})
export class QuestionUpdateComponent implements OnInit {

  @Input() question;
  @Input() challengeId;
  @Input() themeId;

  @Output()
  questionAdded: EventEmitter<string> = new EventEmitter();
  @Output()
  questionUpdated: EventEmitter<string> = new EventEmitter();
  @Output()
  questionUnselected: EventEmitter<string> = new EventEmitter();
  @Output()
  questionAnswerAdded: EventEmitter<string> = new EventEmitter();
  @Output()
  questionAnswerRemoved: EventEmitter<string> = new EventEmitter();

  public addQuestionIsCollapsed = true;
  public answers;
  public textHelper = '';
  public showHelper = false;

  constructor(
    private _challengeService: ChallengeService,
    private _questionService: QuestionService,
    private _themeService: ThemeService
  ) { }

  ngOnInit() {
  }

  addAnswersList(answer) {
    this.questionAnswerAdded.emit(answer);
  }

  deleteAnswersList(answerId) {
    this.questionAnswerRemoved.emit(answerId);
  }

  updateQuestion() {
    const questionData = {
      wording: this.question.wording,
      complement: this.question.complement
    };
    if (this.question.id === undefined) {
      if (this.challengeId) {
        this._challengeService.addChallengeQuestion(this.challengeId, questionData).subscribe(
          (res: any) => {
            this.questionAdded.emit(res);
            this.displayHelper('insert');
          }
      );
    } else if (this.themeId) {
      this._themeService.addThemeQuestion(this.themeId, questionData).subscribe(
        (res: any) => {
          this.questionAdded.emit(res);
          this.displayHelper('insert');
        }
      );
    }
    } else {
      this._questionService.patchQuestion(this.question.id, questionData).subscribe(
        (res: any) => {
          this.questionUpdated.emit(res);
          this.displayHelper('update');
        }
      );
    }
  }

  updateImageQuestion(question) {
    this.questionUpdated.emit(question);
  }

  cancelUpdate() {
    // this.question = {};
    this.questionUnselected.emit();
    this.addQuestionIsCollapsed = true;
  }

  displayHelper(action) {
    switch (action) {
      case 'insert': {
          this.textHelper = 'Ajout effectué avec succès, ' +
                            'vous pouvez maintenant ajouter des réponses à la question et lui associer une image';
         break;
      }
      case 'update': {
          this.textHelper = 'Modification effectuée avec succès';
         break;
      }
   }
   this.showHelper = true;
      setTimeout(() => {
        // this.transitionStart = true;
        this.showHelper = false;
      }, 5000);
  }

}
