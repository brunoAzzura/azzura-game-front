import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InstructionComponent } from '../modal/instruction/instruction.component';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-level-tool-bar',
  templateUrl: './level-tool-bar.component.html',
  styleUrls: ['./level-tool-bar.component.sass']
})
export class LevelToolBarComponent implements OnInit {

  public menuDisplayed = false;
  public bsModalRef: BsModalRef;
  @Output()
  returnWorld: EventEmitter<Boolean> = new EventEmitter();
  @Output()
  displayMenu: EventEmitter<Boolean> = new EventEmitter();

  constructor(
    private _modalService: ModalService
  ) { }

  ngOnInit() {
  }

  open() {
    const initialState = {instructionPath: 'assets/img/games/theme_rules.png'};
    this._modalService.openModal(InstructionComponent, initialState, null, {backdrop: true});
  }

  backToWorldMap() {
    this.returnWorld.emit(true);
  }

  // toggleMenu() {
  //   this.menuDisplayed = !this.menuDisplayed;
  //   this.displayMenu.emit(this.menuDisplayed);
  // }

}
