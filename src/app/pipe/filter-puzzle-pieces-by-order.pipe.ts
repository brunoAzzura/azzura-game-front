import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPuzzlePiecesByOrder',
  pure: false
})
export class FilterPuzzlePiecesByOrderPipe implements PipeTransform {

  transform(puzzlePieces: any, args?: any): any {
    puzzlePieces.sort((a: any, b: any) => {
      return a.piece_order.toString().localeCompare(b.piece_order.toString());
      // return compare(a, b);
    });
    return puzzlePieces;
  }
}
