import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-real-estates-my-list',
  templateUrl: './real-estates-my-list.component.html',
  styleUrls: ['./real-estates-my-list.component.css']
})
export class RealEstatesMyListComponent implements OnInit {

  displayedColumns: string[] = [
    'description',
    'ishouse',
    'size',
    'furnished',
    'renting',
    'price',
    'promoted',
    'active',
    'offers',
  ];
  dataSource: any;

  constructor(
    private realEstateService: RealEstateService,
    private authorizationService: AuthorizationService
  ) { }

  ngOnInit(): void {
    this.getOwned();
  }

  getOwned() {
    const username = this.authorizationService.currentUser.username;
    this.realEstateService.getOwned(username).subscribe(owned => {
      this.dataSource = owned;
    });
  }

}
