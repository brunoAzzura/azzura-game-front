import { ModalService } from './../../service/modal.service';
import { DeviceService } from './../../service/device.service';
import { EndGameComponent } from './../modal/end-game/end-game.component';
import { GameService } from './../../service/game.service';
import { environment } from '../../environments/environment';
import { World } from '../../interface/world';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorldService } from '../../service/world.service';
import { Theme } from '../../interface/theme';
import { AuthService } from '../../authentication/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interface/user';
import { RewardComponent } from '../modal/reward/reward.component';
import { InstructionComponent } from '../modal/instruction/instruction.component';
import { SCORE_NEXT_WORLD_UNLOCK, SCORE_MAX_BY_WORLD, NB_WORLD } from './../../constants';
import { WorldScore } from 'src/app/interface/world-score';
import { delay } from '../../helper/delay';

@Component({
  selector: 'app-level-interface',
  templateUrl: './level-interface.component.html',
  styleUrls: ['./level-interface.component.sass']
})
export class LevelInterfaceComponent implements OnInit, OnDestroy {
  public BASE_PATH = environment.apiGameUrl;

  public resultByTheme: any[];
  public score: number;
  public advancement: number;
  public gameCompleted: boolean = null;
  public currentReward;

  public world: World;
  public themes: Theme[];
  public worldId: number;
  public user: User;

  public menuDisplayed = false;
  public loader = true;
  public fullScreen: boolean;
  public transition = false;
  public gameDisplayed = false;

  public handleModalSubscription;

  public worldCompleted = false;
  public worldScore: WorldScore;

  public themesDataLoaded = false;
  public worldScoreDataloaded = false;
  public rewardLoaded = false;

  constructor(
    private _worldService: WorldService,
    private _userService: UserService,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private router: Router,
    private _modalService: ModalService,
    private _deviceService: DeviceService,
    private _gameService: GameService
  ) { }

  ngOnInit() {
    this.fullScreen = this._deviceService.isFullScreen();
    this.worldId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.fullScreen) {
      this.menuDisplayed = true;
    }

    this.initializeData();
    this.loadThemeData();
    this.loadWorldScoreData();

    this.handleModalSubscription = this._gameService.handleModalClosed().subscribe(action => {
      this._modalService.closeModal();
      if (action === 'worldMap') {
        let data = {};
        if (this.score >= SCORE_NEXT_WORLD_UNLOCK && (!this.worldScore || !this.worldScore.completed)  ) {
          if (this.world.ranking === NB_WORLD - 1) {
            data = {action: 'certificateUnlock'};
          } else {
            data = {action: 'worldUnlock'};
          }
        }
        this.returnWorldMap(data);
      } else {
        this.returnTheme();
      }
    });
  }

  ngOnDestroy() {
    this.handleModalSubscription.unsubscribe();
  }

  initializeData() {
    this.user = this._authService.getUser();
    this.resultByTheme = [];
    this.score = 0;
    this.advancement = 0;
    // this.displayToken = true;
    this.gameCompleted = null;
  }

  loadThemeData() {
    this._worldService.getWorld(this.worldId).subscribe((res: World) => {
      this.themes = res.themes;
      this.world = res;
      this.themesDataLoaded = true;
    });
  }

  loadWorldScoreData() {
    // @todo : only load the good worldScore
    this._userService.getUserWorldsScores(this.user.id).subscribe((worldsScore: any) => {
      for (const world_score of worldsScore) {
        if (world_score.world.id === this.worldId) {
          this.worldScore = world_score;
          if (world_score.score === SCORE_MAX_BY_WORLD && world_score.completed) {
            this.worldCompleted = true;
          }
        }
      }
      this.worldScoreDataloaded = true;
    });
  }

  completeGame(data) {
    if (data.result) {
      this.successTheme(data.theme);
    } else {
      this.failTheme(data.theme);
    }
  }

  successTheme(theme) {
    this.advancement++;
    this.score++;
    this.resultByTheme.push({ id: theme.id, answer: true });
    this.gameCompleted = true;
    this._userService
      .unlockUserReward(this.user.id, theme.id)
      .subscribe((res: any) => {
        // raccourcir le temps de la quete !
        this.currentReward = res.reward;
        this.rewardLoaded = true;
      });
  }

  failTheme(theme) {
    if (this.score > 0) {
      this.score--;
    }
    this.advancement++;
    this.resultByTheme.push({ id: theme.id, answer: false });
    this.gameCompleted = false;
  }

  returnTheme() {
    if (this.advancement === SCORE_MAX_BY_WORLD) {
      if (this.score >= SCORE_NEXT_WORLD_UNLOCK) {
        // Tous les themes ont été traité + world success
        this.worldCompleteValidation();
      }
      this.displayGameOver();
    } else {
      this.gameCompleted = null;
    }
  }

  worldCompleteValidation() {
    this._userService.userCompleteWorld(this._authService.getUser().id, this.worldId).subscribe((res: any) => {
      if (res !== null) {
        this._authService.updateRanking(res.ranking);
      }
    });
  }

  returnWorldMap(data = {}) {
    this.transition = true;
    setTimeout(() => {
      this.router.navigate(['/worldmap', data]);
    }, 1200);
  }

  async  displayReward() {
    // si la reward n'est pas dispo attendre jusqu'à ce qu'elle soit dispo
    if (this.gameCompleted) {
      while (!this.rewardLoaded) {
        await delay(200);
      }
      const initialState = { reward: this.currentReward, dispatchAction: true };
      this._modalService.openModal(RewardComponent, initialState);
      this.rewardLoaded = false;
    } else {
      this.returnTheme();
    }
  }

  displayGameOver() {
    let scoreMax = this.score;
    if (this.worldScore) {
      scoreMax = Math.max(scoreMax, this.worldScore.score);
    }

    const initialState = { score: scoreMax , completed: this.score >= SCORE_NEXT_WORLD_UNLOCK };
    this._modalService.openModal(EndGameComponent, initialState);
  }

  displayInstruction() {
    const initialState = { instructionPath: 'assets/img/games/theme_rules.png' };
    this._modalService.openModal(InstructionComponent, initialState);
  }

  initGame($event) {
    this.gameDisplayed = true;
  }
}
