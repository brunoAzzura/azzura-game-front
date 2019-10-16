import { ModalService } from './../../service/modal.service';
import { Component, OnInit } from '@angular/core';
import { VegetablesDataComponent } from '../vegetables-data/vegetables-data.component';

@Component({
  selector: 'app-vegetables-island',
  templateUrl: './vegetables-island.component.html',
  styleUrls: ['./vegetables-island.component.sass']
})
export class VegetablesIslandComponent implements OnInit {

  constructor(
    private _modalService: ModalService
  ) { }

  ngOnInit() {
  }

  openVegetablesData() {
    this._modalService.openModal(VegetablesDataComponent, {});
  }

}
