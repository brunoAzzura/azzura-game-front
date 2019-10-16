import { Router } from '@angular/router';
import { UserService } from './../../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users = null;
  public filteredUsers = null;

  constructor(
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this._userService.getUsers().subscribe(
      (res) => {
        this.users = res;
        this.filteredUsers = res;
      }
    );
  }

  updateUser(id: number) {
    this.router.navigate(['/gestion/user_update/' + id]);
  }

  filterEmail(query: string) {
    this.filteredUsers = (query) ?
      this.users.filter(u => u.email.toLowerCase().includes(query.toLowerCase() )) :
      this.users;
  }
}
