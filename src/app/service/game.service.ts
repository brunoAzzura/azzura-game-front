import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { getRandomInt } from '../helper/number';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private gameCompleted = new Subject<boolean>();
  private modalClosed = new Subject<string>();

  constructor() { }

  disptachGameCompleted(result: boolean) {
    this.gameCompleted.next(result);
  }

  disptachModalClosed(action: string) {
    this.modalClosed.next(action);
  }

  handleGameCompleted() {
    return this.gameCompleted.asObservable();
  }

  handleModalClosed() {
    return this.modalClosed.asObservable();
  }

  // const randomizer$ = Rx.Observable.of("")
  // .switchMap(() => Rx.Observable
  //            .of(getRandomNumber())
  //            .delay(getRandomDelay()
  // )
  // .repeat();

  public getCoinActive(): any {
    const ob = new Observable(sub => {
      let timeout = null;
      let timer = 0;
      let active = false;

      // recursively send a random number to the subscriber
      // after a random delay
      (function push() {
        timeout = setTimeout(
          () => {
            if (!active) {
              active = getRandomInt(0, 200) === 1;
              // active = true;
            }

            if (active) {
              timer++;
              if (timer === 20 ) {
                active = false;
                timer = 0;
              }
            }

            sub.next(active);
            push();
          },
          1000 // 1000 -> 1s
        );
      })();

      // clear any pending timeout on teardown
      return () => clearTimeout(timeout);
    });

    return ob;
}
}
