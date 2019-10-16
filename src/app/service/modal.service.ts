import { DeviceService } from './device.service';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public bsModalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService,
    private _deviceService: DeviceService,
  ) { }

 // modal-dialog-centered => center on height

  public openModal(component, initialState, classNames = null, options: NgbModalOptions = null) { // modal-dialog-centered

    const fullScreen = this._deviceService.isFullScreen();

    options = options === null ?  {
      backdrop: 'static',
      keyboard: false,
      // centered: true doest work
    } : options ;

    classNames = classNames === null ? ( fullScreen ? 'modal-lg' : 'modal-sm' ) : classNames;

    if (!fullScreen) {
      classNames += ' modal-dialog-centered';
    }

    this.bsModalRef = this.bsModalService.show(
      component,
      Object.assign(options, { class: classNames }, {initialState})
    );
  }

  public closeModal() {
    this.bsModalRef.hide();
  }
}
