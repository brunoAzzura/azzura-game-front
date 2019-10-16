import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {SCORE_NEXT_WORLD_UNLOCK} from './../../constants';

@Component({
  selector: 'app-score-gauge',
  templateUrl: './score-gauge.component.html',
  styleUrls: ['./score-gauge.component.sass'],
  animations: [
    trigger('moveVetical', [
      state('up0', style({transform: 'translateY(0)'})),
      state('up1', style({transform: 'translateY(-140%)'})),
      state('up2', style({transform: 'translateY(-270%)'})),
      state('up3', style({transform: 'translateY(-410%)'})),
      state('up4', style({transform: 'translateY(-560%)'})),
      state('up5', style({transform: 'translateY(-690%)'})),
      state('up6', style({transform: 'translateY(-820%)'})),
      transition('up0 => up1', animate('600ms')),
      transition('up1 => up2', animate('600ms')),
      transition('up2 => up3', animate('600ms')),
      transition('up3 => up4', animate('600ms')),
      transition('up4 => up5', animate('600ms')),
      transition('up5 => up6', animate('600ms')),
      transition('up6 => up5', animate('600ms')),
      transition('up5 => up4', animate('600ms')),
      transition('up4 => up3', animate('600ms')),
      transition('up3 => up2', animate('600ms')),
      transition('up2 => up1', animate('600ms')),
      transition('up1 => up0', animate('600ms')),
    ])
  ]
})
export class ScoreGaugeComponent implements OnInit {
  constructor() { }

  @Input() score;
  @Input() worldCompleted;
  @Input() moveVertical;

  ngOnInit() {
  }

  displayLock() {
    return this.score < SCORE_NEXT_WORLD_UNLOCK;
  }

  // Retourne la bonne image de l'étoile
  starPicture() {
    let path = 'assets/img/theme/flower_lock.png';
    if (this.worldCompleted) {
      path = 'assets/img/theme/flower_unlock.png';
    }
    return path;
  }

}
