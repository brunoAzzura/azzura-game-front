import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faSadCry, faLaughWink } from '@fortawesome/free-solid-svg-icons';
import {
  trigger,
  style,
  transition,
  animate,
  keyframes
} from "@angular/animations";

@Component({
  selector: 'app-answer-container',
  templateUrl: './answer-container.component.html',
  styleUrls: ['./answer-container.component.scss'],
  animations: [
    trigger('flyInOutLeft', [
      // state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        animate(1000, keyframes([
          style({opacity: 0, transform: 'translateX(-300%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(30px)',  offset: 0.7}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ])
    ]),
    trigger('flyInOutRight', [
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
export class AnswerContainerComponent implements OnInit {

  @Input() question;
  @Input() status;

  @Output()
  nextQuestion: EventEmitter<string> = new EventEmitter();

  public fas = {
    sad: faSadCry,
    happy: faLaughWink
  };

  constructor() { }

  ngOnInit() {
  }

  validedAnswer() {
    this.nextQuestion.emit('question');
  }

}
