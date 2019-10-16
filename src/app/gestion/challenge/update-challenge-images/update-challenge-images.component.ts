import { LocalStorageService } from 'ngx-store';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from './../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const URL_ADD_IMG = environment.apiGameUrl + 'challenges/';

@Component({
  selector: 'app-update-challenge-images',
  templateUrl: './update-challenge-images.component.html',
  styleUrls: ['./update-challenge-images.component.scss']
})
export class UpdateChallengeImagesComponent implements OnInit {

  @Input() challenge;
  @Output()
  imageUpload: EventEmitter<string> = new EventEmitter();

  public BASE_PATH = environment.apiGameUrl;

  public uploaderFile: FileUploader = new FileUploader({
    url: null,
    itemAlias: 'challengeImage',
    authTokenHeader: 'Authorization',
    authToken: 'Bearer ' + this._localStorageService.get('token')
  });

  constructor(
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.uploaderFile.setOptions({
      url: URL_ADD_IMG + (this.challenge.id) + '/upload'
    });
    this.uploaderFile.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploaderFile.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const challenge = JSON.parse(response);
      this.imageUpload.emit(challenge.image_presentation_path);
    };
  }

}
