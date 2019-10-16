import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../../service/challenge.service';

@Component({
  selector: 'app-challenge-list',
  templateUrl: './challenge-list.component.html',
  styleUrls: ['./challenge-list.component.scss']
})
export class ChallengeListComponent implements OnInit {

  public challenges = null;

  public BASE_PATH = environment.apiGameUrl;

  constructor(
    private _challengeService: ChallengeService,
    private router: Router
  ) { }

  ngOnInit() {
    this._challengeService.getChallenges().subscribe(
      (res: any) => {
        this.challenges = res;
      }
    );
  }

  launchChallenge(id: number) {
    this.router.navigate(['/challenge/' + id]);
  }

}
