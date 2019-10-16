import { ChallengeService } from './../../service/challenge.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { DeviceService } from 'src/app/service/device.service';


@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.scss']
})
export class ChallengeComponent implements OnInit {

  @ViewChild('nav') myDivRef: ElementRef;
  public challenge = null;
  public fullScreen: boolean;
  public state: any = {
    advancement: 0,
    nbQuestions: null,
    status: 'start',
    score: 0
  };
  public currentQuestion = null;

  constructor(
    private _challengeService: ChallengeService,
    private route: ActivatedRoute,
    private _deviceService: DeviceService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.fullScreen = this._deviceService.isFullScreen();
    this._challengeService.getChallenge(id).subscribe(
      (res: any) => {
        this.challenge = res;
        this.state.nbQuestions = this.challenge.questions.length;
      }
    );
  }

  scrollTop() {
    this.myDivRef.nativeElement.scrollIntoView();
  }

  updateStatus($event) {
    if ($event === 'question') {
      this.state.status = 'answer';
      if (this.state.advancement === this.state.nbQuestions) {
        this.state.status = 'endGame';
        return;
      }
      this.currentQuestion = this.challenge.questions[this.state.advancement];
      this.state.advancement++;
    }
    this.state.status = $event;

    this.scrollTop();
  }

  completeQuestion($event) {
        if ($event) {
          this.state.score++;
          this.state.status = 'goodAnswer';
        } else {
          this.state.status = 'badAnswer';
        }

        this.updateStatus('question');
  }

  // displayAnswer($event: boolean) {
  //   if ($event) {
  //     this.state.score++;
  //     this.state.status = 'goodAnswer';
  //   } else {
  //     this.state.status = 'badAnswer';
  //   }
  // }
}
