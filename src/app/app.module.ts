
import { ErrorInterceptorService } from './service/error-interceptor.service';
import { AlertService } from './service/alert.service';
import { UpdateQuestionsContainerComponent } from './gestion/question/update-questions-container/update-questions-container.component';
import { QuestionImageUpdateComponent } from './gestion/question/question-image-update/question-image-update.component';
// import { MemoryModule } from './memorygame/memory.module';
import { LogoComponent } from './memorygame/dashboard/logo.component';
import { InfoComponent } from './memorygame/dashboard/info.component';
import { ChessboardComponent } from './memorygame/chessboard/chessboard.component';
import { CardComponent } from './memorygame/chessboard/card.component';
import { StatusComponent } from './memorygame/status/status.component';
import { MemoryComponent } from './memorygame/memory.component';
import { DashboardComponent } from './memorygame/dashboard/dashboard.component';

import { GameActions } from './store/action';
import { ReduxConfigModule } from './store'; // import ReduxConfigModule dans index.js

import { GoodToKnow } from './interface/good-to-know';
import { QuestionService } from './service/question.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { FileSelectDirective } from 'ng2-file-upload';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { DataTableModule } from 'angular-6-datatable';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WorldmapComponent } from './game/worldmap/worldmap.component';
import { NavComponent } from './nav/nav.component';


import { WorldService } from './service/world.service';
import { UserService } from './service/user.service';
import { ThemeService } from './service/theme.service';
import { AnswerService } from './service/answer.service';
import { AvatarService } from './service/avatar.service';
import { GoodtoknowService } from './service/goodtoknow.service';
import { MemoryCardService } from './service/memory-card.service';
import { BsModalService, ModalBackdropComponent } from 'ngx-bootstrap';

import { LevelInterfaceComponent } from './game/level-interface/level-interface.component';
import { GoodToKnowComponent } from './gestion/good-to-know/good-to-know.component';
import { WorldComponent } from './gestion/world/world.component';
import { WorldUpdateComponent } from './gestion/world-update/world-update.component';
import { ThemeUpdateComponent } from './gestion/theme-update/theme-update.component';
import { LoginComponent } from './authentication/login/login.component';
import { AccountComponent } from './account/account.component';


import { WebStorageModule } from 'ngx-store';
import { AuthGuard } from './auth/auth.guard';
import { AvatarsComponent } from './gestion/avatars/avatars.component';
import { AccountUpdateComponent } from './account-update/account-update.component';
import { CollectionComponent } from './collection/collection.component';
import { FilterGoodtoknowsByWorldPipe } from './pipe/filter-goodtoknows-by-world.pipe';
import { PuzzleComponent } from './puzzle/puzzle.component';

// memory game
import { NgReduxModule, NgRedux } from '@angular-redux/store';


import { PuzzleGameService } from './service/puzzle-game.service';
import { FilterPuzzlePiecesByOrderPipe } from './pipe/filter-puzzle-pieces-by-order.pipe';
import { FileUploadModule } from 'ng2-file-upload';
import { PuzzleGestionComponent } from './gestion/games/puzzle-gestion/puzzle-gestion.component';
import { MemoryGameGestionComponent } from './gestion/games/memory-game-gestion/memory-game-gestion.component';
import { LoaderComponent } from './loader/loader.component';
import { QuizzGameComponent } from './quizz-game/quizz-game.component';
import { ChallengeListComponent } from './challenge/challenge-list/challenge-list.component';
import { ChallengeComponent } from './challenge/challenge/challenge.component';
import { AdvancementContainerComponent } from './challenge/advancement-container/advancement-container.component';
import { AnswerContainerComponent } from './challenge/answer-container/answer-container.component';
import { ScoreContainerComponent } from './challenge/score-container/score-container.component';
import { NoticeContainerComponent } from './challenge/notice-container/notice-container.component';
import { UpdateChallengeListComponent } from './gestion/challenge/update-challenge-list/update-challenge-list.component';
import { AddChallengeComponent } from './gestion/challenge/add-challenge/add-challenge.component';
import { UpdateChallengeComponent } from './gestion/challenge/update-challenge/update-challenge.component';
import { UpdateChallengeDataComponent } from './gestion/challenge/update-challenge-data/update-challenge-data.component';
import { UpdateChallengeImagesComponent } from './gestion/challenge/update-challenge-images/update-challenge-images.component';
// end memory game
import { NgxEditorModule } from 'ngx-editor';
import { QuestionsListUpdateComponent } from './gestion/question/questions-list-update/questions-list-update.component';
import { QuestionUpdateComponent } from './gestion/question/question-update/question-update.component';
import { QuestionAnswersUpdateComponent } from './gestion/question/question-answers-update/question-answers-update.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { StatTestComponent } from './stat-test/stat-test.component';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { AlertComponent } from './alert/alert.component';
import { JwtInterceptorService } from './service/jwt-interceptor.service';
import { UserListComponent } from './gestion/user/user-list/user-list.component';
import { UserAddComponent } from './gestion/user/user-add/user-add.component';
import { UserGestionComponent } from './gestion/user/user-gestion/user-gestion.component';
import { UserUpdateComponent } from './gestion/user/user-update/user-update.component';
import { UserUpdatePasswordComponent } from './gestion/user/user-update-password/user-update-password.component';
import { UserUpdateContainerAdminComponent } from './gestion/user/user-update-container-admin/user-update-container-admin.component';

import { DeviceDetectorModule } from 'ngx-device-detector';
import { ScoreGaugeComponent } from './game/score-gauge/score-gauge.component';
import { LevelToolBarComponent } from './game/level-tool-bar/level-tool-bar.component';
import { MascotListComponent } from './game/mascot-list/mascot-list.component';
import { GameContainerModalComponent } from './game/modal/game-container-modal/game-container-modal.component';
import { RewardComponent } from './game/modal/reward/reward.component';
import { EndGameComponent } from './game/modal/end-game/end-game.component';
import { InstructionComponent } from './game/modal/instruction/instruction.component';
import { WorldMapToolBarComponent } from './game/world-map-tool-bar/world-map-tool-bar.component';
import { GameRewardsComponent } from './game/modal/game-rewards/game-rewards.component';
import { CertificatComponent } from './game/certificat/certificat.component';
import { VideoModalComponent } from './game/modal/video-modal/video-modal.component';
import { CoinBonusComponent } from './game/coin-bonus/coin-bonus.component';
import { IslandListComponent } from './game/island-list/island-list.component';
import { GameResultComponent } from './game/game-result/game-result.component';
import { FlowerTrophyComponent } from './game/flower-trophy/flower-trophy.component';
import { GlobalScoreComponent } from './game/global-score/global-score.component';
import { CertificateBonusComponent } from './game/certificate-bonus/certificate-bonus.component';
import { CloudTransitionComponent } from './game/cloud-transition/cloud-transition.component';
import { GameLoaderComponent } from './game/game-loader/game-loader.component';
import { GoodToKnowBonusComponent } from './collection/modal/good-to-know-bonus/good-to-know-bonus.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VegetablesIslandComponent } from './game/vegetables-island/vegetables-island.component';
import { VegetablesDataComponent } from './game/vegetables-data/vegetables-data.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'puzzle', component: PuzzleComponent },
  // {path: 'memory', component: MemoryComponent},
  {
    path: 'account', component: AccountComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'account/update', component: AccountUpdateComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'worldmap', component: WorldmapComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'world/:id', component: LevelInterfaceComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'collection', component: CollectionComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'challenges', component: ChallengeListComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'challenge/:id', component: ChallengeComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'gestion/worlds', component: WorldComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'gestion/users', component: UserGestionComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'gestion/user', component: UserAddComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'gestion/user_update/:id', component: UserUpdateContainerAdminComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'gestion/challenges', component: UpdateChallengeListComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'gestion/avatars', component: AvatarsComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'gestion/goodtoknow', component: GoodToKnowComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'gestion/theme/:id', component: ThemeUpdateComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'gestion/challenge/:id', component: UpdateChallengeComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'gestion/world/:id', component: WorldUpdateComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'statsTest', component: StatTestComponent, canActivate: [
      AuthGuard
    ]
  },
  {
    path: '',
    redirectTo: '/worldmap',
    pathMatch: 'full'
  },
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    WorldmapComponent,
    NavComponent,
    GoodToKnowComponent,
    WorldComponent,
    WorldUpdateComponent,
    LevelInterfaceComponent,
    // FileSelectDirective,
    ThemeUpdateComponent,
    LoginComponent,
    AccountComponent,
    AvatarsComponent,
    AccountUpdateComponent,
    CollectionComponent,
    FilterGoodtoknowsByWorldPipe,
    PuzzleComponent,
    MemoryComponent,
    DashboardComponent,
    LogoComponent,
    InfoComponent,
    ChessboardComponent,
    CardComponent,
    StatusComponent,
    FilterPuzzlePiecesByOrderPipe,
    PuzzleGestionComponent,
    MemoryGameGestionComponent,
    LoaderComponent,
    QuizzGameComponent,
    ChallengeListComponent,
    ChallengeComponent,
    AdvancementContainerComponent,
    AnswerContainerComponent,
    ScoreContainerComponent,
    NoticeContainerComponent,
    UpdateChallengeListComponent,
    AddChallengeComponent,
    UpdateChallengeComponent,
    UpdateChallengeDataComponent,
    UpdateChallengeImagesComponent,
    QuestionsListUpdateComponent,
    QuestionUpdateComponent,
    QuestionAnswersUpdateComponent,
    QuestionImageUpdateComponent,
    SpinnerComponent,
    UpdateQuestionsContainerComponent,
    StatTestComponent,
    AlertComponent,
    UserListComponent,
    UserAddComponent,
    UserGestionComponent,
    UserUpdateComponent,
    UserUpdatePasswordComponent,
    UserUpdateContainerAdminComponent,
    ScoreGaugeComponent,
    LevelToolBarComponent,
    MascotListComponent,
    GameContainerModalComponent,
    RewardComponent,
    EndGameComponent,
    InstructionComponent,
    WorldMapToolBarComponent,
    GameRewardsComponent,
    CertificatComponent,
    VideoModalComponent,
    CoinBonusComponent,
    IslandListComponent,
    GameResultComponent,
    FlowerTrophyComponent,
    GlobalScoreComponent,
    CertificateBonusComponent,
    CloudTransitionComponent,
    GameLoaderComponent,
    GoodToKnowBonusComponent,
    VegetablesIslandComponent,
    VegetablesDataComponent,
  ],
  imports: [
    NgxEditorModule,
    Ng2GoogleChartsModule,
    NgReduxModule,
    BrowserModule,
    DataTableModule,
    HttpClientModule,
    WebStorageModule,
    FontAwesomeModule,
    // MemoryModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    RouterModule.forRoot(
      appRoutes
    ),
    ReactiveFormsModule,
    FormsModule,
    AngularFontAwesomeModule,
    ReduxConfigModule,
    FileUploadModule,
    DeviceDetectorModule.forRoot()
  ],
  exports: [
    NgReduxModule
  ],
  entryComponents: [GameContainerModalComponent, EndGameComponent, RewardComponent, InstructionComponent,
    GameRewardsComponent, VideoModalComponent, CertificatComponent, GoodToKnowBonusComponent, VegetablesDataComponent],
  providers: [
    BsModalService,
    WorldService,
    UserService,
    ThemeService,
    QuestionService,
    AnswerService,
    AvatarService,
    GoodtoknowService,
    AuthGuard,
    GameActions,
    MemoryCardService,
    PuzzleGameService,
    GameActions,
    ReduxConfigModule,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

// export class ReduxConfigModule {
//   constructor(private ngRedux: NgRedux<IState>) {
//     this.ngRedux.configureStore(rootReducer, {}, [], []);
//   }
// }
