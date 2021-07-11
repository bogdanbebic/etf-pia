import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-real-estate-detail',
  templateUrl: './real-estate-detail.component.html',
  styleUrls: ['./real-estate-detail.component.css']
})
export class RealEstateDetailComponent implements OnInit {

  description: string;
  city: string;
  municipality: string;
  street: string;
  streetnumber: string;
  ishouse: boolean;
  numfloors: number;
  size: number;
  numrooms: number;
  furnished: boolean;
  renting: boolean;
  price: number;
  owner: string;

  constructor(
    private route: ActivatedRoute,
    private realEstateService: RealEstateService
  ) { }

  ngOnInit(): void {
    this.getRealEstate();
  }

  getRealEstate() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.realEstateService.getRealEstate(id).subscribe((realEstate: any) => {
      console.log(realEstate);
      this.description = realEstate.description;
      this.city = realEstate.city;
      this.municipality = realEstate.municipality;
      this.street = realEstate.street;
      this.streetnumber = realEstate.streetnumber;
      this.ishouse = realEstate.ishouse;
      this.numfloors = realEstate.numfloors;
      this.size = realEstate.size;
      this.numrooms = realEstate.numrooms;
      this.furnished = realEstate.furnished;
      this.renting = realEstate.renting;
      this.price = realEstate.price;
      this.owner = realEstate.owner;
    });
  }

  rent() {
    // TODO: implement
  }

  buy() {
    // TODO: implement
  }

}
