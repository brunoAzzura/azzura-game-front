import { ChallengeService } from './../../../service/challenge.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-challenge-list',
  templateUrl: './update-challenge-list.component.html',
  styleUrls: ['./update-challenge-list.component.scss']
})
export class UpdateChallengeListComponent implements OnInit {

  public challenges = null;

  constructor(
    public _challengeService: ChallengeService
  ) { }

  ngOnInit() {
    this._challengeService.getChallenges().subscribe(
      (res) => {
        this.challenges = res;
      }
    );
  }

}
