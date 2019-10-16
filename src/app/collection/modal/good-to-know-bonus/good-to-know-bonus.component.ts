import { DeviceService } from 'src/app/service/device.service';
import { BsModalRef } from 'ngx-bootstrap';
import { GoodToKnow } from './../../../interface/good-to-know';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-good-to-know-bonus',
  templateUrl: './good-to-know-bonus.component.html',
  styleUrls: ['./good-to-know-bonus.component.sass']
})
export class GoodToKnowBonusComponent implements OnInit {

  public BASE_URL = environment.apiGameUrl;

  @Input() reward: any;
  @Input() type: any;
  public fullScreen: boolean;

  constructor(
    private _bsModalRef: BsModalRef,
    private _deviceService: DeviceService
  ) { }

  ngOnInit() {
    this.fullScreen = this._deviceService.isFullScreen();
  }

  @HostListener('click')
  clickInside() {
      this.close();
  }

  close() {
    this._bsModalRef.hide();
  }
}


