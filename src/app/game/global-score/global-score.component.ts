import { Component, OnInit, Input } from '@angular/core';
import { NB_WORLD } from './../../constants';

@Component({
  selector: 'app-global-score',
  templateUrl: './global-score.component.html',
  styleUrls: ['./global-score.component.sass']
})
export class GlobalScoreComponent implements OnInit {

  @Input() nbWorldCompleted: number;
  @Input() nbWorldScoreMax: number;

  public markerVerticalPositions = [
    41, 36.8, 32.8, 29.4, 28.5, 24, 20, 16
  ];

  constructor() { }

  ngOnInit() {
  }

  getStyleMarkerPosition() {
    let position = this.nbWorldCompleted;
    // let position = this.worldsCompleted.length;
    if (this.nbWorldScoreMax === NB_WORLD) {
      position++;
    }
    return { 'left': '2%', 'top': this.markerVerticalPositions[position] + '%', width: '3.2%' };
  }

}
