import { Component, OnInit } from '@angular/core';
import { RealEstateCardInfo } from '../real-estate-card-info';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-promoted',
  templateUrl: './promoted.component.html',
  styleUrls: ['./promoted.component.css']
})
export class PromotedComponent implements OnInit {

  promotedRealEstates: RealEstateCardInfo[];

  constructor(
    private realEstateService: RealEstateService
  ) { }

  ngOnInit(): void {
    this.realEstateService.getPromoted().subscribe((realEstates: RealEstateCardInfo[]) => {
      this.promotedRealEstates = realEstates;
    });
  }

}
