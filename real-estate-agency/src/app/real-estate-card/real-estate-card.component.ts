import { Component, Input, OnInit } from '@angular/core';
import { RealEstateCardInfo } from '../real-estate-card-info';

@Component({
  selector: 'app-real-estate-card',
  templateUrl: './real-estate-card.component.html',
  styleUrls: ['./real-estate-card.component.css']
})
export class RealEstateCardComponent implements OnInit {

  @Input() realEstateInfo: RealEstateCardInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
