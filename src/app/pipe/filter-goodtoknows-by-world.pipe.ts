import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterGoodtoknowsByWorld'
})
export class FilterGoodtoknowsByWorldPipe implements PipeTransform {

  /**
   * Filtre un tableau de bons à savoir en fonction du monde
   * @param goodtoknows
   * @param worldId
   */
  transform(goodtoknows: any, worldId?: any): any {
    if (worldId) {
      return goodtoknows.filter(goodtoknow => goodtoknow.theme.world.id === worldId);
    } else {
      return goodtoknows;
    }
  }
}
