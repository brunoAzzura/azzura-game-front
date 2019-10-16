import { MemoryCardService } from './../../../service/memory-card.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Theme } from '../../../interface/theme';
import { LocalStorageService } from 'ngx-store';
import { ThemeService } from '../../../service/theme.service';

const URL_ADD_MEMORYCARDS = environment.apiGameUrl + 'memorycards';

@Component({
  selector: 'app-memory-game-gestion',
  templateUrl: './memory-game-gestion.component.html',
  styleUrls: ['./memory-game-gestion.component.sass']
})

export class MemoryGameGestionComponent implements OnInit {

  public mode = 'insert';
  public addIsCollapsed = true;
  public memoryCard;
  public uploaderMemoryCard: FileUploader = new FileUploader({
        url: URL_ADD_MEMORYCARDS,
        itemAlias: 'memoryImage',
        authTokenHeader: 'Authorization',
        authToken: 'Bearer ' + this._localStorageService.get('token')
      });
  public BASE_PATH = environment.apiGameUrl;

  @ViewChild('selectedFile') selectedFile: any;


  @Input() theme: Theme;
  public memoryCards;

  constructor(
    private _localStorageService: LocalStorageService,
    private _memoryCardService: MemoryCardService,
    private _themeService: ThemeService
  ) { }

  ngOnInit() {
    this._themeService.getMemoryCards(this.theme.id).subscribe(
      (res) => {
        this.memoryCards = res;
      }
    );

    this.memoryCard = {id: null, wording: '', image_path: ''};

    // ####### file upload memory card ##############
    this.uploaderMemoryCard.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('name' , this.memoryCard.name);
      form.append('themeId' , this.theme.id);
      if (this.mode === 'update') {
        form.append('card_id' , this.memoryCard.id);
      }
    };
    this.uploaderMemoryCard.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploaderMemoryCard.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (this.mode === 'insert') {
        const card = JSON.parse(response);
        this.memoryCards.push(card);
      }
      this.cancelMemoryCard();
    };
  }

  updateMemoryCard() {
    if (this.mode === 'insert' || this.uploaderMemoryCard.queue.length > 0) {
      this.uploaderMemoryCard.uploadAll();
    }
  }

  cancelMemoryCard() {
    this.mode = 'insert';
    this.addIsCollapsed = true;
    this.memoryCard = {id: null, wording: '', image_path: ''};
    this.uploaderMemoryCard.clearQueue();
    this.selectedFile.nativeElement.value = '';
  }

  deleteMemoryCard(MemoryCardId: number) {
    this._memoryCardService.deleteMemoryCard(MemoryCardId).subscribe(
      (res) => {
        this.memoryCards = this.memoryCards.filter(item => item.id !== MemoryCardId);
      }
    );
  }

}
