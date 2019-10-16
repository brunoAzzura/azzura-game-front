import { LocalStorageService } from 'ngx-store';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../authentication/services/auth.service';
import { DeviceService } from '../service/device.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
  public navbarCollapsed: boolean;
  public fullSreen: boolean;

  @Input() noSpace: boolean;

  constructor(
    public _auth: AuthService,
    public _localStorageService: LocalStorageService,
    private _deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.fullSreen = this._deviceService.isFullScreen();
    this.navbarCollapsed = true;
  }

  logoutUser() {
    this._auth.logout();
  }
}
