import { ModalService } from './../../service/modal.service';
import { VideoModalComponent } from './../modal/video-modal/video-modal.component';
import { InstructionComponent } from './../modal/instruction/instruction.component';
import { DeviceService } from './../../service/device.service';
import { environment } from '../../environments/environment';
import { MemoryCardService } from '../../service/memory-card.service';
import { UserService } from '../../service/user.service';
import { World } from '../../interface/world';
import { WorldService } from '../../service/world.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../authentication/services/auth.service';
import { SCORE_MAX_BY_WORLD, NB_WORLD } from './../../constants';


@Component({
  selector: 'app-worldmap',
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.sass']
})


export class WorldmapComponent implements OnInit {

  public NB_WORLD = NB_WORLD;
  public worlds: World[];
  public flowerAnimation = 'small';
  public BASE_PATH = environment.apiGameUrl;
  public token;
  public user;
  public displayMenu = false;
  public nbWorldScoreMax = 0;
  public worldsCompletedScore = [];
  public transition = false;
  public userDataLoaded = false;
  public worldDataLoaded = false;
  public displayGame = false;
  public fullSreen: boolean;
  public beginAnimation = false;

  constructor(
    private _worldService: WorldService,
    private router: Router,
    public _auth: AuthService,
    private _userService: UserService,
    public _memoryCardService: MemoryCardService,
    private _deviceService: DeviceService,
    private _openModal: ModalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.user = this._auth.getUser();
    this.fullSreen = this._deviceService.isFullScreen();
    if (!this.fullSreen) {
      this.displayMenu = true;
    }
    this.loadUserData();
    this.loadWorldData();
  }

  loadWorldData() {
    this._worldService.getWorlds().subscribe(
      (res: World[]) => {
        this.worlds = res;
        this.worldDataLoaded = true;
      },
      err => {
        if (err.status === 403) {
          this._auth.logout();
        }
      }
    );
  }

  loadUserData() {
    this._userService.getUserWorldsScores(this.user.id).subscribe(
      (worldsScore: any) => {
        for (const world_score of worldsScore) {
          if (world_score.score >= SCORE_MAX_BY_WORLD && world_score.completed) {
            this.nbWorldScoreMax++;
          }
          if (world_score.completed) {
            this.worldsCompletedScore.push({ 'world_id': world_score.world.id, 'score': world_score.score });
          }
        }
        this.userDataLoaded = true;
      }
    );
  }

  startTransition(world: World) {
    this.transition = true;
    setTimeout(() => {
      this.router.navigate(['/world/' + world.id]);
    }, 1200);
  }

  displayInfoAfterInit() {
    this.route.params.subscribe(params => {
      if (params['action'] && params['action'] === 'worldUnlock') {
        this.displayWorldUnlock();
      } else if (params['action'] && params['action'] === 'certificateUnlock') {
        this.displayCertificateUnlock();
      }
      });
  }

  displayInstruction() {
    const initialState = { instructionPath: 'assets/img/games/world_rules.png' };
    this._openModal.openModal(InstructionComponent, initialState);
  }

  displayWorldUnlock() {
    const initialState = { videoPath: 'assets/video/world/world_unlock.mp4' };
    this._openModal.openModal(VideoModalComponent, initialState);
  }

  displayCertificateUnlock() {
    const initialState = { videoPath: 'assets/video/world/certificate_unlock.mp4' };
    this._openModal.openModal(VideoModalComponent, initialState);
  }

  initGame($event) {
    this.displayGame = true;
    this.beginAnimation = true;
    this.displayInfoAfterInit();
  }
}

