import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQuery: string;
  priceRangeMin: number;
  priceRangeMax: number;

  constructor() { }

  ngOnInit(): void {
  }

  search() {
    // TODO: implement
  }

}
