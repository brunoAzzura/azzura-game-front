import { BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.sass']
})
export class InstructionComponent implements OnInit {

  @Input() instructionPath: string;
  public BASE_PATH = environment.apiGameUrl;

  constructor(
    private _bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  @HostListener('click')
  clickInside() {
      this.close();
  }

  close() {
    this._bsModalRef.hide();
  }

}
