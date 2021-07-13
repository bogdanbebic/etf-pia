import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../user-data';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  username: string;
  firstname: string;
  lastname: string;
  city: string;
  country: string;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.username = String(this.route.snapshot.paramMap.get('username'));
    this.getUser();
  }

  getUser() {
    this.usersService.getUser(this.username).subscribe((user: UserData) => {
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.city = user.city;
      this.country = user.country;
    });
  }

  changeUserData() {
    const userData = {
      firstname: this.firstname,
      lastname: this.lastname,
      city: this.city,
      country: this.country,
    };

    this.usersService.changeUserData(this.username, userData).subscribe(ok => {
      this.getUser();
    });
  }

  changeProfilePicture() {
    this.usersService.changeProfilePicture(this.username, this.images).subscribe(ok => {
      this.getUser();
    });
  }

  images = null;

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

}
