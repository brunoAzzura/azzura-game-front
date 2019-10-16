import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.sass'],
  animations: [
    trigger('moveLeft', [
      transition('void => *', [
        style({ transform: 'translateX(600%) translateY(-30%) scale(1.5)' }),
        animate('1500ms')
      ])
    ])
  ]
})
export class GameResultComponent implements OnInit {

  @Input() gameCompleted: boolean;
  @Input() score: number;
  @Input() worldCompleted: boolean;

  @Output() resultAnimationDone: EventEmitter<any> = new EventEmitter();

  public moveVertical = 'up0';
  public animationToken = ['up0', 'up1', 'up2', 'up3', 'up4', 'up5', 'up6'];
  public moveLeft;

  constructor() { }

  ngOnInit() {

  }

    /**
   * Action apres le déplacement du marqueur vers la barre de scores
   */
  animationDone($event, answer: string) {
    if ($event.fromState === 'void') {
      if (answer === 'error') {
        this.moveVertical = this.animationToken[this.score];
      } else if (answer === 'success') {
        this.moveVertical = this.animationToken[this.score];
      }
      this.resultAnimationDone.emit();
    }
  }

}
