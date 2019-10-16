import { LocalStorageService } from 'ngx-store';
import { environment } from './../../environments/environment';

import { ThemeDraw } from './../../interface/theme-draw';

import { WorldDraw, WorldDrawClass } from './../../interface/world-draw';
import { World} from './../../interface/world';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorldService } from './../../service/world.service';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { ThemeService } from '../../service/theme.service';
import { AuthService } from '../../authentication/services/auth.service';
const URL = environment.apiGameUrl + 'uploadFile';

@Component({
  selector: 'app-world-update',
  templateUrl: './world-update.component.html',
  styleUrls: ['./world-update.component.sass']
})
export class WorldUpdateComponent implements OnInit {

  public name;
  public worlds;
  public worldForm: FormGroup;
  public world$;
  public world;
  public uploader: FileUploader = new FileUploader(
          {
              url: URL,
              itemAlias: 'image',
              authTokenHeader: 'Authorization',
              authToken: 'Bearer ' + this._localStorageService.get('token')
          });
  public BASE_PATH = environment.apiGameUrl;
  public world_path;
  public imgs;
  public themeAdded;
  public addThemeIsCollapsed = true;
  public gameTypes$;
  public gameTypes;
  public showMessage = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _worldService: WorldService,
    private _themeService: ThemeService,
    private _auth: AuthService,
    private _localStorageService: LocalStorageService,
  ) {
    this.createForm();
  }

  getStylePosition(worldDraw: WorldDraw): {} {
    return {'left': worldDraw.position_x + '%', 'top': worldDraw.position_y + '%'};
  }

  createForm() {
    this.worldForm = this.fb.group({
      wording: ['', Validators.required ],
      description: ['', Validators.required ],
      ranking: ['', Validators.required ],
      world_draw: this.fb.group(
        {
          position_x: ['', Validators.required],
          position_y: ['', Validators.required]
        }
      )
    });
  }

  ngOnInit() {
    this.themeAdded = {wording: '', description: ''};
    const id =  this.route.snapshot.paramMap.get('id');

    // this.gameTypes$ = this._themeService.getGameTypes();
    this._themeService.getGameTypes().subscribe(
      (res) => {
        this.gameTypes = res;
      }
    );
    this._worldService.getWorld(id).subscribe(
      (res) => {
        this.world = res;

        this.world_path = this.BASE_PATH +  this.world.world_draw.image_path;
        this.worldForm.setValue({
          wording: this.world.wording,
          description: this.world.description,
          ranking: this.world.ranking,
          world_draw: {
            position_x: this.world.world_draw.position_x,
            position_y: this.world.world_draw.position_y
          }
       });
       // loading des informations sur les images
       this.imgs = new Array<any>();
       let img = {
         description : 'Image du monde',
         src : this.world.world_draw.image_path ? this.BASE_PATH + this.world.world_draw.image_path : null,
         var: 'image_path',
         checked: true
       };
       this.imgs.push(img);
       img = {
         description : 'Background du monde',
         src : this.world.world_draw.background ? this.BASE_PATH + this.world.world_draw.background : null,
         var: 'background',
         checked: false
       };
       this.imgs.push(img);
       img = {
        description : 'Logo du monde',
        src : this.world.world_draw.logo_path ? this.BASE_PATH + this.world.world_draw.logo_path : null,
        var: 'logo_path',
        checked: false
      };
      this.imgs.push(img);

      // ########  file upload ################
      this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
        form.append('world_id' , this.world.id);
        form.append('var' , this.getImageToUpload());
      };
      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        // todo mettre à jour le bon path
        // this.world_path = this.BASE_PATH +  this.world.world_draw.image_path + '?' + new Date().getTime();
        const url = (JSON.parse(response));
          const newUrl = this.BASE_PATH + url.img_path;
          for (const currentImg of this.imgs) {
            if (currentImg.checked === true) {
              currentImg.src = newUrl;
            }
          }
          alert('image uploadée avec succès');
      };
     // ####################################
      }
    );
  }

  prepareSaveWorld() {
    const formModel = this.worldForm.value;
    const worldDraw = {
      id: this.world.world_draw.id,
      position_x: formModel.world_draw.position_x,
      position_y: formModel.world_draw.position_y
    };
    const saveWorld = {
      id: this.world.id,
      wording: formModel.wording,
      description: formModel.description,
      ranking: formModel.ranking,
      world_draw: worldDraw,
      themes: this.world.themes
    };
    return saveWorld;
  }

  updateWorld() {
    const worldUpdate = this.prepareSaveWorld();

    this._worldService.updateWorld(worldUpdate).subscribe(
      (res) => {
        this.displayMessage();
        this.world = res;
      }
    );
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

  cancelAddTheme() {
    this.addThemeIsCollapsed = true;
    this.themeAdded = {wording: '', description: ''};
  }

  addTheme() {
    this.themeAdded.ranking = 9;

    if (this.themeAdded.game_type.wording === 'puzzle') {
      this.themeAdded.puzzle_game = {
        time_limit: 240,
        nb_cases: 3,
        image_puzzle_path: ''
      };
    }

    this.themeAdded.world = this.world;
    this.themeAdded.theme_draw = {
      position_x: 0,
      position_y: 0,
      image_path: '',
      image_success_path: '',
      image_error_path: '',
      width: 20
    };

    this._themeService.insertTheme(this.themeAdded).subscribe(
      (res) => {
        if (this.world.themes === null) {
          this.world.themes = [res];
        } else {
          this.world.themes.push(res);
        }

        this.cancelAddTheme();
      }
    );
  }

  compareByOptionId(fist, second) {
    return fist && second && fist.id === second.id;
  }

  displayMessage() {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 5000);
  }
}


