import { LocalStorageService } from 'ngx-store';
import { environment } from './../../environments/environment';
import {  FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { AvatarService } from './../../service/avatar.service';
import { Component, OnInit, ViewChild } from '@angular/core';

const URL = environment.apiGameUrl + 'avatars';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.sass']
})
export class AvatarsComponent implements OnInit {

  public BASE_PATH = environment.apiGameUrl;
  public avatars;
  public addAvatarIsCollapsed = true;
  public uploader: FileUploader = new FileUploader({
                  url: URL,
                  itemAlias: 'image',
                  authTokenHeader: 'Authorization',
                  authToken: 'Bearer ' + this._localStorageService.get('token')
                });
  public libelle = '';
  public mode = 'insert';
  public avatar;
  @ViewChild('selectedFile') selectedFile: any;

  constructor(
    private _avatarService: AvatarService,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.avatar = {id: null, libelle: '', image_path: ''};

    this._avatarService.getAvatars().subscribe(
      (res) => {
        this.avatars = res;
      }
    );

    // ########  file upload ################
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('libelle' , this.avatar.libelle);
      if (this.mode === 'update') {
        form.append('avatar_id' , this.avatar.id);
      }
    };
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const avatar = JSON.parse(response);
      if (this.mode === 'insert') {
        // add new element to the list
        this.avatars.push(avatar);
      } else {
        // upgrade the element in the list
         const itemIndex = this.avatars.findIndex(a => a.id === avatar.id);
         this.avatars[itemIndex] = avatar;
      }
      this.cancelAvatar();
    };
  }

  /**
   * Affiche le fomrulaire de modification de l'avatar donné en paramètre
   * @param avatar Avatar
   */
  displayUpdateForm(avatar) {
    this.mode = 'update';
    this.addAvatarIsCollapsed = false;
    this.avatar = avatar;
  }

  /**
   * Cancel l'ajout/modification de l'avatar
   */
  cancelAvatar() {
    this.mode = 'insert';
    this.addAvatarIsCollapsed = true;
    this.avatar = {id: null, libelle: '', image_path: ''};
    this.uploader.clearQueue();
    this.selectedFile.nativeElement.value = '';
  }

  /**
   * ajout/modification de l'avatar en cours de sélection
   */
  updateAvatar() {
    if (this.mode === 'insert' || this.uploader.queue.length > 0) {
      this.uploader.uploadAll();
    } else {
      this._avatarService.updateAvatar(this.avatar).subscribe();
    }
  }

  delelteAvatar(avatar) {
  }
}
