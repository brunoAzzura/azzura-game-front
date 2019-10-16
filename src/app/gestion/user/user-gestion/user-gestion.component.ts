import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-gestion',
  templateUrl: './user-gestion.component.html',
  styleUrls: ['./user-gestion.component.scss']
})
export class UserGestionComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // chargement des utilisateurs + spinner dans ce component ?
  }

  addUser() {
    this.router.navigate(['/gestion/user']);
  }

}
