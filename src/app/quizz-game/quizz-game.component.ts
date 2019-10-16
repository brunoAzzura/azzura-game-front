import { DeviceService } from './../service/device.service';
import { Observable } from "rxjs/Observable";
import { interval } from "rxjs";
import { Answer } from "./../interface/answer";
import { environment } from "./../environments/environment";
import { Theme } from "./../interface/theme";
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { Question } from "../interface/question";
import { faSadCry, faLaughWink } from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from "@angular/animations";
import { ThemeService } from '../service/theme.service';

@Component({
  selector: "app-quizz-game",
  templateUrl: "./quizz-game.component.html",
  styleUrls: ["./quizz-game.component.sass"],
  animations: [
    trigger("biggerAnimation", [
      state(
        "big",
        style({
          transform: "scale(1.3)"
        })
      )
    ]),
    trigger('flyOutLeft', [
      // state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(1000, keyframes([
          style({opacity: 0, transform: 'translateX(-300%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(30px)',  offset: 0.7}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ])
    ]),
    trigger('flyOutRight', [
      // state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(1000, keyframes([
          style({opacity: 0, transform: 'translateX(300%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(-30px)',  offset: 0.7}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class QuizzGameComponent implements OnInit, OnDestroy, OnChanges {
  public currentQuestion: Question;
  public checkAnswers: number[];
  public BASE_PATH: string = environment.apiGameUrl;
  public timer: Number = 0;
  public timer$: Observable<number>;
  public displayImage = false;
  public fullSreen: boolean;
  public timerSubscriber;
  public animationTimer = false;
  public answer: boolean = null;
  public fas = {
    sad: faSadCry,
    happy: faLaughWink
  };

  @Output()
  completeGame: EventEmitter<Boolean> = new EventEmitter();

  @Input()
  theme: Theme;

  @Input()
  question: Question;

  constructor(
    private _deviceService: DeviceService,
    private _themeService: ThemeService
    ) { }

  ngOnInit() {
    this.fullSreen = this._deviceService.isFullScreen();
    this.checkAnswers = [];
    if (this.theme) {
      // @todo optimiser (cherchez que 1 question random) ?
      this._themeService.getThemeQuestions(this.theme.id).subscribe(
        (questions: any) => {
          this.currentQuestion = questions[
            Math.floor(Math.random() * questions.length)
          ];
        }
      );
    } else {
      this.currentQuestion = this.question;
    }

    this.timer$ = interval(1000);
    this.timerSubscriber = this.timer$.subscribe(val => {
      if (val > 0) {
        this.animationTimer = true;
      }

      if (val >= 60) {
        this.completeGame.emit(false);
      }
    });
  }

  ngOnDestroy() {
    this.timerSubscriber.unsubscribe();
  }

  ngOnChanges(changes) {
    if (changes.question && !changes.question.firstChange) {
      this.reinitilize();
    }
  }

  reinitilize() {
    this.currentQuestion = this.question;
    this.timerSubscriber.unsubscribe();
    this.checkAnswers = [];
    this.timer$ = interval(1000);
    this.timerSubscriber = this.timer$.subscribe(val => {
      if (val > 0) {
        this.animationTimer = true;
      }

      if (val >= 60) {
        this.completeGame.emit(false);
      }
    });
    this.answer = null;
  }

  /**
   * Met à jour les réponses séléctionnées par l'utilisateur dans this.checkAnswers
   * @param answer Answer
   */
  checkAnswer(answer: Answer) {
    if (this.checkAnswers.indexOf(answer.id) !== -1) {
      this.checkAnswers.splice(this.checkAnswers.indexOf(answer.id), 1);
    } else {
      this.checkAnswers.push(answer.id);
    }
  }

  /**
   * Verification de la réponse
   * Enregistrement de l'historique theme -> success/error
   */
  answerMultipleQuestion() {
    let correctAnswer: boolean;
    correctAnswer = true;
    // verification de la réponse
    this.currentQuestion.answers.forEach(function (answer) {
      if (answer.valid && this.checkAnswers.indexOf(answer.id) === -1) {
        correctAnswer = false;
      }
      if (!answer.valid && this.checkAnswers.indexOf(answer.id) !== -1) {
        correctAnswer = false;
      }
    }, this);

    // enregistrement des scores
    if (correctAnswer) {
      this.answer = true;
    } else {
      this.answer = false;
    }
  }

  validComplement() {
    this.completeGame.emit(this.answer);
  }
}
