import { ThemeService } from './../../service/theme.service';
import { LocalStorageService } from 'ngx-store';
import { environment } from './../../environments/environment';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { GoodtoknowService } from './../../service/goodtoknow.service';
import { Component, OnInit, ViewChild } from '@angular/core';

const URL = environment.apiGameUrl + 'goodtoknows';

@Component({
  selector: 'app-good-to-know',
  templateUrl: './good-to-know.component.html',
  styleUrls: ['./good-to-know.component.sass']
})
export class GoodToKnowComponent implements OnInit {

  public BASE_PATH = environment.apiGameUrl;
  public goodtoknows;
  public goodtoknowAdded;
  public mode = 'insert';
  public addIsCollapsed = true;
  public uploader: FileUploader = new FileUploader({
          url: URL,
          itemAlias: 'image',
          authTokenHeader: 'Authorization',
          authToken: 'Bearer ' + this._localStorageService.get('token')
        });
  public themes;


  @ViewChild('selectedFile') selectedFile: any;

  constructor(
    private _goodtoknowService: GoodtoknowService,
    private _themeService: ThemeService,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.goodtoknowAdded = {id: null, wording: '', path: '', info: '', type: '', world: null};


    this._themeService.getThemes().subscribe(
      (res) => {
        this.themes = res;
      }
    );

    this._goodtoknowService.getGoodtoknows().subscribe(
      (res) => {
        this.goodtoknows = res;
      }
    );
    // ########  file upload ################
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('wording' , this.goodtoknowAdded.wording);
      form.append('info' , this.goodtoknowAdded.info);
      form.append('themeId' , this.goodtoknowAdded.theme.id);
      if (this.mode === 'update') {
        form.append('goodtoknow_id' , this.goodtoknowAdded.id);
      }
    };
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (this.mode === 'insert') {
        const goodtoknow = JSON.parse(response);
        this.goodtoknows.push(goodtoknow);
      }
      this.cancelGoodtoknow();
    };
  }

  displayUpdateForm(goodtoknow) {
    this.mode = 'update';
    this.addIsCollapsed = false;
    this.goodtoknowAdded = goodtoknow;
  }

  updateGoodtoknow() {
    if (this.mode === 'insert' || this.uploader.queue.length > 0) {
      this.uploader.uploadAll();
    } else {
      this._goodtoknowService.updateGoodtoknow(this.goodtoknowAdded).subscribe(
        (res) => {
          this.cancelGoodtoknow();
        }
      );
    }
  }

  cancelGoodtoknow() {
    this.mode = 'insert';
    this.addIsCollapsed = true;
    this.goodtoknowAdded = {id: null, wording: '', info : '', path: '', type: ''};
    this.uploader.clearQueue();
    this.selectedFile.nativeElement.value = '';
  }

  compareByOptionId(fist, second) {
    return fist && second && fist.id === second.id;
  }

}
