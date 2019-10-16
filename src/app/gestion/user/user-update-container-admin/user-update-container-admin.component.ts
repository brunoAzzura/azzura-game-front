import { UserService } from './../../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-update-container-admin',
  templateUrl: './user-update-container-admin.component.html',
  styleUrls: ['./user-update-container-admin.component.scss']
})
export class UserUpdateContainerAdminComponent implements OnInit {

  public user = null;

  constructor(
    private route: ActivatedRoute,
    private _userService: UserService
  ) { }

  ngOnInit() {
    const id =  this.route.snapshot.paramMap.get('id');
    this._userService.getUser(id).subscribe(
      (res) => {
        this.user = res;
      }
    );
  }

  updatechange(user) {
  }

}
