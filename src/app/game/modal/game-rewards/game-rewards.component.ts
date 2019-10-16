import { Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-rewards',
  templateUrl: './game-rewards.component.html',
  styleUrls: ['./game-rewards.component.sass']
})
export class GameRewardsComponent implements OnInit {

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
