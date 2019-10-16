import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-notice-container',
  templateUrl: './notice-container.component.html',
  styleUrls: ['./notice-container.component.scss']
})
export class NoticeContainerComponent implements OnInit {

  @Input() challenge;
  public step = 1;

  @Output()
  tutoCompleted: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  nextStep() {
    this.step++;
  }

  startGame() {
    this.tutoCompleted.emit('question');
  }
}
