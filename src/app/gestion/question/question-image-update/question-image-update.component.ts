import { environment } from './../../../environments/environment';
import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { LocalStorageService } from 'ngx-store';

const URL_ADD_QUESTION_IMG = environment.apiGameUrl + 'questions/';

@Component({
  selector: 'app-question-image-update',
  templateUrl: './question-image-update.component.html',
  styleUrls: ['./question-image-update.component.scss']
})
export class QuestionImageUpdateComponent implements OnInit {

  @Input() question;
  @Output()
  imageUpload: EventEmitter<string> = new EventEmitter();

  public BASE_PATH = environment.apiGameUrl;

  public uploaderQuestionFile: FileUploader = new FileUploader({
    url: null,
    itemAlias: 'questionImage',
    authTokenHeader: 'Authorization',
    authToken: 'Bearer ' + this._localStorageService.get('token')
  });

  @ViewChild('selectedQuestionFile') selectedQuestionFile: any;

  constructor(
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.uploaderQuestionFile.setOptions({
      url: URL_ADD_QUESTION_IMG + (this.question ? this.question.id : null) + '/upload'
    });
    this.uploaderQuestionFile.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploaderQuestionFile.onCompleteItem = (item: any, response: any, status: any, headers: any) => {

    this.imageUpload.emit(JSON.parse(response));
    };
  }
}

