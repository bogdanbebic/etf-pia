import { Component, OnInit } from '@angular/core';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-real-estates-unapproved',
  templateUrl: './real-estates-unapproved.component.html',
  styleUrls: ['./real-estates-unapproved.component.css']
})
export class RealEstatesUnapprovedComponent implements OnInit {

  displayedColumns: string[] = ['description', 'ishouse', 'size', 'owner', 'renting', 'approve', 'reject' ];
  dataSource: any;

  constructor(
    private realEstateService: RealEstateService
  ) { }

  ngOnInit(): void {
    this.getUnapproved();
  }

  getUnapproved() {
    this.realEstateService.getUnapproved().subscribe(unapproved => {
      this.dataSource = unapproved;
    });
  }

  approveRealEstate(id) {
    this.realEstateService.approveRealEstate(id).subscribe(ok => {
      this.getUnapproved();
    });
  }

  rejectRealEstate(id) {
    this.realEstateService.rejectRealEstate(id).subscribe(ok => {
      this.getUnapproved();
    });
  }

}
