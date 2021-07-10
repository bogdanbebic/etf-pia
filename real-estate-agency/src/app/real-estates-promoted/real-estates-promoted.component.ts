import { Component, OnInit } from '@angular/core';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-real-estates-promoted',
  templateUrl: './real-estates-promoted.component.html',
  styleUrls: ['./real-estates-promoted.component.css']
})
export class RealEstatesPromotedComponent implements OnInit {

  displayedColumns: string[] = ['description', 'ishouse', 'size', 'owner', 'renting', 'remove' ];
  dataSource: any;

  constructor(
    private realEstateService: RealEstateService
  ) { }

  ngOnInit(): void {
    this.getPromoted();
  }

  getPromoted() {
    this.realEstateService.getPromoted().subscribe(promoted => {
      this.dataSource = promoted;
    });
  }

  removeFromPromoted(id) {
    this.realEstateService.removeFromPromoted(id).subscribe(ok => {
      this.getPromoted();
    });
  }

}
