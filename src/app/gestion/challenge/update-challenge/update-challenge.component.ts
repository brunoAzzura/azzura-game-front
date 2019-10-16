import { ChallengeService } from './../../../service/challenge.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-challenge',
  templateUrl: './update-challenge.component.html',
  styleUrls: ['./update-challenge.component.scss']
})
export class UpdateChallengeComponent implements OnInit {

  public challenge = null;

  constructor(
    private route: ActivatedRoute,
    private _challengeService: ChallengeService
  ) { }

  ngOnInit() {
    const id =  this.route.snapshot.paramMap.get('id');
    this._challengeService.getChallenge(id).subscribe(
      (res) => {
        this.challenge = res;
      }
    );
  }

  updateChallengeImagePath(imagePath) {
    this.challenge.image_presentation_path = imagePath;
  }

}
