import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private deviceService: DeviceDetectorService
  ) { }

  isFullScreen() {
    return !(this.deviceService.isDesktop());
    // simulate mobile on desktop
    return true;
  }
}
