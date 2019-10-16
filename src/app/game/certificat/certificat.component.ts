import { DeviceService } from './../../service/device.service';
import { BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-certificat',
  templateUrl: './certificat.component.html',
  styleUrls: ['./certificat.component.sass']
})
export class CertificatComponent implements OnInit {

  @Input() userId;
  public certificate = null;
  public BASE_PATH = environment.apiGameUrl;
  public fullScreen: boolean;

  constructor(
    private _bsModalRef: BsModalRef,
    private _userService: UserService,
    private _deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.fullScreen = this._deviceService.isFullScreen();
    this._userService.getCertificate(this.userId).subscribe(
      res => {
        this.certificate = res;
      }
    );
  }

  close() {
    this._bsModalRef.hide();
  }

  download() {
    this._userService.downloadCertificate().subscribe(
      response => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(response);
        a.href = url;
        a.download = 'mon_certificat.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    );
  }
}
