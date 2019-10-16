import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { WorldService } from './../../service/world.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.sass']
})
export class WorldComponent implements OnInit {

  public worlds;
  public worldAdded;
  public addIsCollapsed = true;
  public BASE_PATH = environment.apiGameUrl;

  constructor(
    private _worldService: WorldService
  ) { }

  ngOnInit() {
    this.worldAdded = {};
    this._worldService.getWorlds().subscribe(
      (res) => {
        this.worlds = res;
      }
    );
  }

  addWorld() {

    // @todo : à tester + merge/persist world_draw

    this.worldAdded.world_draw = {
      position_x: 0,
      position_y: 0,
      image_path: '',
      wording: '',
      background: '',
      logo_path: ''
    };

    this._worldService.insertWorld(this.worldAdded).subscribe(
      (res) => {
        this.worlds.push(res);
        this.cancelAddWorld();
      }
    );
  }

  cancelAddWorld () {
    this.worldAdded = {};
    this.addIsCollapsed = true;
  }

}
