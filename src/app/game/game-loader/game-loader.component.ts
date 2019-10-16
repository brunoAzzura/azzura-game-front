import { EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';
import { delay } from '../../helper/delay';

@Component({
  selector: 'app-game-loader',
  templateUrl: './game-loader.component.html',
  styleUrls: ['./game-loader.component.sass']
})
export class GameLoaderComponent implements OnInit {

  @Input() dataLoaded: boolean;
  @Output()
  hideLoader: EventEmitter<boolean> = new EventEmitter();
  public displayLoader = true;

  constructor() { }

  ngOnInit() {
    this.loading();
  }

  async loading () {
    // while (!this.userDataLoaded || !this.worldDataLoaded) {
    while (!this.dataLoaded) {
      await delay(100);
    }
    // add timeout to load images
    setTimeout(() => {
      this.displayLoader = false;
      this.hideLoader.emit(true);
      // this.displayInfoAfterInit();
    }, 1500);
  }
}
