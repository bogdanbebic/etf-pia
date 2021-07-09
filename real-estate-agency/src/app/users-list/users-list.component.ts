import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['username', 'email', 'firstname', 'lastname', 'accept', 'reject', 'delete' ];
  dataSource: any;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.usersService.getAll().subscribe(users => {
      this.dataSource = users;
    });
  }

  acceptUser(username: string) {
    this.usersService.registerAccept(username).subscribe(ok => {
      this.getAll();
    });
  }

  rejectUser(username: string) {
    this.usersService.registerReject(username).subscribe(ok => {
      this.getAll();
    });
  }

  deleteUser(username: string) {
    this.usersService.deleteUser(username).subscribe(ok => {
      this.getAll();
    });
  }

}
