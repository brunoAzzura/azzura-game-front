import { ModalService } from './../../service/modal.service';
import { InstructionComponent } from './../modal/instruction/instruction.component';
import { EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-world-map-tool-bar',
  templateUrl: './world-map-tool-bar.component.html',
  styleUrls: ['./world-map-tool-bar.component.sass']
})
export class WorldMapToolBarComponent implements OnInit {

  public menuDisplayed = false;
  public bsModalRef: BsModalRef;

  @Output()
  displayMenu: EventEmitter<Boolean> = new EventEmitter();

  constructor(
    private _modalService: ModalService
  ) { }

  ngOnInit() {
  }

  open() {
    const initialState = {instructionPath: 'assets/img/games/world_rules.png'};
    this._modalService.openModal(InstructionComponent, initialState, null, {backdrop: true});
  }

  // toggleMenu() {
  //   this.menuDisplayed = !this.menuDisplayed;
  //   this.displayMenu.emit(this.menuDisplayed);
  // }

}
