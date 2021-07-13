import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FilesService } from '../files.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = [
    'picture',
    'username',
    'email',
    'firstname',
    'lastname',
    'accept',
    'reject',
    'edit',
    'delete',
  ];
  dataSource: any;

  constructor(
    private usersService: UsersService,
    private filesService: FilesService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.usersService.getAll().subscribe(users => {
      this.dataSource = users;
      this.dataSource.forEach(element => {
        this.filesService.getProfilePicture(element.username).subscribe(picture => {
          let objURL = URL.createObjectURL(picture);
          element.imgurl = this.sanitizer.bypassSecurityTrustUrl(objURL);
        });
      });
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
