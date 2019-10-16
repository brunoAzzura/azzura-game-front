import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-score-container',
  templateUrl: './score-container.component.html',
  styleUrls: ['./score-container.component.scss']
})
export class ScoreContainerComponent implements OnInit {

  @Input() state;
  @Input() challenge;

  constructor() { }

  ngOnInit() {
  }

}
