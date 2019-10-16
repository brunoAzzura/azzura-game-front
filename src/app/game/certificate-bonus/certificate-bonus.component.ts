import { ModalService } from './../../service/modal.service';
import { BsModalRef } from 'ngx-bootstrap';
import { CertificatComponent } from './../certificat/certificat.component';
import { Component, OnInit, Input } from '@angular/core';

import { NB_WORLD } from './../../constants';

@Component({
  selector: 'app-certificate-bonus',
  templateUrl: './certificate-bonus.component.html',
  styleUrls: ['./certificate-bonus.component.sass']
})
export class CertificateBonusComponent implements OnInit {

  @Input() userId: number;
  @Input() nbWorldCompleted: number;
  public NB_WORLD = NB_WORLD;
  public bsModalRef: BsModalRef;

  constructor(
    private _modalService: ModalService
  ) { }

  ngOnInit() {
  }

  displayCertificate() {
    const initialState = { userId: this.userId };
    this._modalService.openModal(CertificatComponent, initialState);
  }
}
