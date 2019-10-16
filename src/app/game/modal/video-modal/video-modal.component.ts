import { BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.sass']
})
export class VideoModalComponent implements OnInit {

  @Input() videoPath: string;

  constructor(
    private _bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  close() {
    this._bsModalRef.hide();
  }

}
