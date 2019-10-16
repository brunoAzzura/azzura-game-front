import { GameType } from './../../interface/game-type';
import { environment } from './../../environments/environment';
import { PuzzleGameService } from './../../service/puzzle-game.service';
import { WorldService } from './../../service/world.service';
import { QuestionService } from './../../service/question.service';
import { QuestionClass } from './../../interface/question';
import { Answer } from './../../interface/answer';
import { ThemeDraw } from './../../interface/theme-draw';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThemeService } from './../../service/theme.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

import { FormsModule } from '@angular/forms';
import { Question } from '../../interface/question';
import { Theme } from '../../interface/theme';
import { AnswerService } from '../../service/answer.service';
import { LocalStorageService } from 'ngx-store';

const URL = environment.apiGameUrl + 'uploadFilesTheme';

@Component({
  selector: 'app-theme-update',
  templateUrl: './theme-update.component.html',
  styleUrls: ['./theme-update.component.sass']
})
export class ThemeUpdateComponent implements OnInit {

  public themeForm: FormGroup;
  public theme;
  public imgs;
  public uploader: FileUploader = new FileUploader({
              url: URL,
              itemAlias: 'image',
              authTokenHeader: 'Authorization',
              authToken: 'Bearer ' + this._localStorageService.get('token')
            });

  public BASE_PATH = environment.apiGameUrl;
  public themes$;
  public showMessage = false;
  public gameTypes = null;

  constructor(
    private _themeService: ThemeService,
    private _worldService: WorldService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _localStorageService: LocalStorageService,
    private router: Router,
  ) {
    this.createForm();
  }

  ngOnInit() {

    // initialsier l'objet correctement
    const id =  this.route.snapshot.paramMap.get('id');

    this._themeService.getGameTypes().subscribe(
      (res) => {
        this.gameTypes = res;
      }
    );

    this._themeService.getTheme(id).subscribe(
      (res) => {
        this.theme = res;
        // initialisation du formulaire
        this.themeForm.setValue({
          wording: this.theme.wording,
          description: this.theme.description,
          gameType: this.theme.game_type,
          theme_draw: {
            position_x: this.theme.theme_draw.position_x,
            position_y: this.theme.theme_draw.position_y,
            width: this.theme.theme_draw.width
          }
        });

        this.themes$ =  this._worldService.getWorldThemes(this.theme.world.id);
        // loading des informations sur les images
        this.imgs = new Array<any>();
        let img = {
          description : 'mascotte',
          src : this.theme.theme_draw.image_path ? this.BASE_PATH + this.theme.theme_draw.image_path : null,
          var: 'image_path',
          checked: true
        };
        this.imgs.push(img);
        img = {
          description : 'mascotte happy',
          src : this.theme.theme_draw.image_success_path ? this.BASE_PATH + this.theme.theme_draw.image_success_path : null,
          var: 'image_success_path',
          checked: false
        };
        this.imgs.push(img);
        img = {
          description : 'mascotte sad',
          src : this.theme.theme_draw.image_error_path ? this.BASE_PATH + this.theme.theme_draw.image_error_path : null,
          var: 'image_error_path',
          checked: false
        };
        this.imgs.push(img);

        // ########  file upload ################
        this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
          form.append('theme_id' , this.theme.id);
          form.append('var' , this.getImageToUpload());
        };
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          // Mettre à jour l'image a uploader + img de l'apperçu si mascotte simple
          // todo : pk devoir convertir en JON
          // todo : devrait être automatique ???
          const url = (JSON.parse(response));
          const newUrl = this.BASE_PATH + url.img_path;
          for (const currentImg of this.imgs) {
            if (currentImg.checked === true) {
              currentImg.src = newUrl + '?' + new Date().getTime();
            }
          }
          alert('image uploadée avec succès');
        };
      }
    );
  }

  createForm() {
    this.themeForm = this.fb.group({
      wording: ['', Validators.required ],
      description: ['', Validators.required ],
      gameType: ['', Validators.required],
      theme_draw: this.fb.group({
        position_x: ['', Validators.required ],
        position_y: ['', Validators.required ],
        width: ['', Validators.required ]
      })
    });
  }

  majCheck(img) {
    for (const currentImg of this.imgs) {
      currentImg.checked = false;
    }
    img.checked = !img.checked;
  }

  getImageToUpload() {
    for (const currentImg of this.imgs) {
      if (currentImg.checked === true) {
        return currentImg.var;
      }
    }
    return false;
  }

  getStylePosition(themeDraw) {
    return {'left': themeDraw.position_x + '%', 'top': themeDraw.position_y + '%', 'width': themeDraw.width + '%'};
  }

  prepareSaveTheme() {
    const formModel = this.themeForm.value;
    const saveTheme = {
      wording: formModel.wording,
      description: formModel.description,
      ranking: this.theme.ranking,
    };
    return saveTheme;
  }

  prepareSaveThemeDraw() {
    const formModel = this.themeForm.value;
    const saveThemeDraw = {
      position_x: formModel.theme_draw.position_x,
      position_y: formModel.theme_draw.position_y,
      width: formModel.theme_draw.width,
    };
    return saveThemeDraw;
  }

  updateTheme() {
    const themeUpdate = this.prepareSaveTheme();
    const themeDrawUpdate = this.prepareSaveThemeDraw();
    const formModel = this.themeForm.value;
    this._themeService.updateTheme(themeUpdate, this.theme.id).subscribe(
      (res) => {
        this.theme = res;
        this._themeService.updateThemeDraw(themeDrawUpdate, this.theme.theme_draw.id).subscribe(
          (themeDraw) => {
            this.theme.theme_draw = themeDraw;
            if (this.theme.game_type.id !== formModel.gameType.id) {
              this._themeService.updateThemeGameType(formModel.gameType, this.theme.id).subscribe(
                (gameType) => {
                  this.theme.game_type = gameType;
                  this.displayMessage();
                }
              );
              this.displayMessage();
            } else {
              this.displayMessage();
            }
          }
        );
      }
    );
  }

  returnWorldgestion() {
    this.router.navigate([`/gestion/world/${this.theme.world.id}`]);
  }

  displayMessage() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }

  compareByOptionId(fist, second) {
    return fist && second && fist.id === second.id;
  }
}
