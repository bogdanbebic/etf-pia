import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-real-estate-detail',
  templateUrl: './real-estate-detail.component.html',
  styleUrls: ['./real-estate-detail.component.css']
})
export class RealEstateDetailComponent implements OnInit {

  realEstateDetail: any;

  constructor(
    private route: ActivatedRoute,
    private realEstateService: RealEstateService
  ) { }

  ngOnInit(): void {
    this.getRealEstate();
  }

  getRealEstate() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.realEstateService.getRealEstate(id).subscribe(realEstate => {
      this.realEstateDetail = realEstate;
      console.log(this.realEstateDetail);
    });
  }

}
