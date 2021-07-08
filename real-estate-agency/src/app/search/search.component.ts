import { Component, OnInit } from '@angular/core';
import { RealEstateCardInfo } from '../real-estate-card-info';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQuery: string;
  priceRangeMin: number;
  priceRangeMax: number;

  searchResults: RealEstateCardInfo[]

  constructor(
    private realEstateService: RealEstateService
  ) { }

  ngOnInit(): void {
  }

  search() {
    this.realEstateService.search(this.searchQuery, this.priceRangeMin, this.priceRangeMax)
      .subscribe((realEstates: RealEstateCardInfo[]) => {
        this.searchResults = realEstates;
      });
  }

}
