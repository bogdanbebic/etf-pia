import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthorizationService } from '../authorization.service';
import { BackendReturnCode } from '../backend-return-code';
import { RealEstateService } from '../real-estate.service';
import { UserRoles } from '../user-roles.enum';

@Component({
  selector: 'app-real-estates-new',
  templateUrl: './real-estates-new.component.html',
  styleUrls: ['./real-estates-new.component.css']
})
export class RealEstatesNewComponent implements OnInit {

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

  constructor(
    private authorizationService: AuthorizationService,
    private realEstateService: RealEstateService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  newRealEstate() {
    const userRole = this.authorizationService.currentUser.role;
    const username = this.authorizationService.currentUser.username;
    const owner = userRole == UserRoles.Registered ? username : "admin";

    const realEstateData = {
      description: this.description,
      city: this.city,
      municipality: this.municipality,
      street: this.street,
      streetnumber: this.streetnumber,
      ishouse: this.ishouse,
      numfloors: this.numfloors,
      size: this.size,
      numrooms: this.numrooms,
      furnished: this.furnished,
      renting: this.renting,
      price: this.price,
      owner: owner,
    };

    this.realEstateService.newRealEstate(realEstateData).subscribe((returnCode: BackendReturnCode) => {
      if (returnCode.ok) {
        this.snackBar.open("New Real Estate Success!", "OK", {
          duration: 2000
        });
      }
      else {
        this.snackBar.open("New Real Estate Failed!", "OK", {
          duration: 2000
        });
      }
    });
  }

}
