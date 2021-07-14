import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BackendReturnCode } from '../backend-return-code';
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-real-estate-offers',
  templateUrl: './real-estate-offers.component.html',
  styleUrls: ['./real-estate-offers.component.css']
})
export class RealEstateOffersComponent implements OnInit {

  displayedColumns: string[] = [
    'username',
    'accept',
  ];
  dataSource: any;

  id: string;
  description: string;

  constructor(
    private route: ActivatedRoute,
    private realEstateService: RealEstateService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.id = String(this.route.snapshot.paramMap.get('id'));
    this.getRealEstateOffers();
  }

  getRealEstateOffers() {
    this.realEstateService.getRealEstate(this.id).subscribe((realEstate: any) => {
      this.description = realEstate.description;
      this.dataSource = realEstate.offers;
    });
  }

  acceptOffer(username: string) {
    this.realEstateService.acceptOffer(this.id, username).subscribe((ok: BackendReturnCode) => {
      if (ok.ok) {
        this.snackBar.open("Accepted offer from " + username, "OK", {
          duration: 2000
        });
      }

      this.getRealEstateOffers();
    });
  }

}
