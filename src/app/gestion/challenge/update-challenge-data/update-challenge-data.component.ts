import { ChallengeService } from './../../../service/challenge.service';
import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-update-challenge-data',
  templateUrl: './update-challenge-data.component.html',
  styleUrls: ['./update-challenge-data.component.scss']
})
export class UpdateChallengeDataComponent implements OnInit {

  @Input() challenge;

  public updateOk = false;

  constructor(
    private _challengeService: ChallengeService
  ) { }

  ngOnInit() {
  }

  updateChallenge() {
    // creer un formulaire avec juste les infos voulu ou supprimer les infos non voulu
    const modifiedChallenge = {
      wording: this.challenge.wording,
      description: this.challenge.description,
      introduction_text: this.challenge.introduction_text,
      ending_text: this.challenge.ending_text
    };

    this._challengeService.updateChallenge(this.challenge.id, modifiedChallenge).subscribe(
      (res) => {
        this.displayUpdateInformation();
      }
    );
  }

  displayUpdateInformation() {
    this.updateOk = true;
    setTimeout(() => {
      // this.transitionStart = true;
      this.updateOk = false;
    }, 2000);
  }
}
