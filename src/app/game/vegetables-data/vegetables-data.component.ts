import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/service/modal.service';

@Component({
  selector: 'app-vegetables-data',
  templateUrl: './vegetables-data.component.html',
  styleUrls: ['./vegetables-data.component.sass']
})
export class VegetablesDataComponent implements OnInit {

  public seasons = [{wording: 'Eté', begin: {day: 20, month: 6 }, end : {day: 21, month: 9 }, class: 'btn-success', path: 'assets/img/theme/vegetables/ete.png'},
                    {wording: 'Automne', begin: {day: 22, month: 9 }, end : {day: 21, month: 12 }, class: 'btn-danger', path: 'assets/img/theme/vegetables/automne.png'},
                    {wording: 'Hiver', begin: {day: 22, month: 12 }, end : {day: 19, month: 3 }, class: 'btn-info', path: 'assets/img/theme/vegetables/hiver.png'},
                    {wording: 'Printemps', begin: {day: 20, month: 3 }, end : {day: 19, month: 6 }, class: 'btn-warning', path: 'assets/img/theme/vegetables/printemps.png'}
  ];

  public currentSeason;
  public selectedSeason;

  constructor(
    private _modalService: ModalService
  ) { }

  ngOnInit() {
    let seasonSearch;
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    this.seasons.forEach(function(season) {
      if (month > season.begin.month && month < season.end.month ||
          month === season.begin.month && day >= season.begin.day ||
          month === season.end.month && day <= season.end.day ) {
            seasonSearch = season;
      }
    });
    this.currentSeason = seasonSearch;
    this.selectedSeason = seasonSearch;
  }

  public close() {
    this._modalService.closeModal();
  }

  public selectSeason(season) {
    this.selectedSeason = season;
  }

}
