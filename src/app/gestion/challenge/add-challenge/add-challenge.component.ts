import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-challenge',
  templateUrl: './add-challenge.component.html',
  styleUrls: ['./add-challenge.component.scss']
})
export class AddChallengeComponent implements OnInit {

  public challenge = {wording: '', description: ''};
  public addIsCollapsed = true;

  @Output()
  challengeAdded: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addChallenge() {

  }

  cancelAddChallenge() {

  }

}
