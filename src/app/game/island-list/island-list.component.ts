import { Output, EventEmitter } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { World } from 'src/app/interface/world';
import { WorldDraw } from 'src/app/interface/world-draw';
import { environment } from '../../environments/environment';
import { SCORE_MAX_BY_WORLD } from './../../constants';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-island-list',
  templateUrl: './island-list.component.html',
  styleUrls: ['./island-list.component.sass'],
  animations: [
    trigger('biggerAnimation', [
      state('big', style({
        transform: 'scale(1.02)'
      })),
      transition('small => big', animate(400, style({ transform: 'scale(1.02)' }))),
      transition('big => small', animate(400, style({ transform: 'scale(1)' })))
    ])]
})
export class IslandListComponent implements OnInit {

  @Input() worlds: World[];
  @Input() worldsCompletedScore: any[];
  @Input() userRanking: number;

  @Output()
  worldSelected: EventEmitter<World> = new EventEmitter();

  public sizes: string[] = [];
  public BASE_PATH = environment.apiGameUrl;

  constructor() { }

  ngOnInit() {
    for (const world of this.worlds) {
      this.sizes[world.id] = 'small';
    }
  }

  select($event: MouseEvent, id: number) {
    this.sizes[id] = 'big';
  }

  out($event: MouseEvent, id: number) {
    this.sizes[id] = 'small';
  }

  startTransation(world: World) {

  }

  getStylePosition(worldDraw: WorldDraw): {} {
    return { 'left': worldDraw.position_x + '%', 'top': worldDraw.position_y + '%' };
  }

  getRoundImage(id: number) {
    const worldScore = this.worldsCompletedScore.find(world => world.world_id === id);
    if (worldScore === undefined) {
      return 'assets/img/world/blue_round.png';
    } else if (worldScore.score === SCORE_MAX_BY_WORLD) {
      return 'assets/img/world/gold_round.gif';
    } else {
      return 'assets/img/world/green_round.png';
    }
  }

  emitWorldSelected(world: World) {
    this.worldSelected.emit(world);
  }

}
