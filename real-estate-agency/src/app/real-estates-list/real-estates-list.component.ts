import { Component, OnInit } from '@angular/core';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-real-estates-list',
  templateUrl: './real-estates-list.component.html',
  styleUrls: ['./real-estates-list.component.css']
})
export class RealEstatesListComponent implements OnInit {

  displayedColumns: string[] = [
    'description',
    'ishouse',
    'size',
    'owner',
    'renting',
    'approve',
    'reject',
    'promote',
    'unpromote',
    'offers',
  ];
  dataSource: any;

  constructor(
    private realEstateService: RealEstateService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.realEstateService.getAll().subscribe(realEstates => {
      this.dataSource = realEstates;
    });
  }

  approveRealEstate(id) {
    this.realEstateService.approveRealEstate(id).subscribe(ok => {
      this.getAll();
    });
  }

  rejectRealEstate(id) {
    this.realEstateService.rejectRealEstate(id).subscribe(ok => {
      this.getAll();
    });
  }

  addToPromoted(id) {
    this.realEstateService.addToPromoted(id).subscribe(ok => {
      this.getAll();
    });
  }

  removeFromPromoted(id) {
    this.realEstateService.removeFromPromoted(id).subscribe(ok => {
      this.getAll();
    });
  }

}
