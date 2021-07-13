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

    const formElement = document.getElementById('formNewRealEstate') as HTMLFormElement;
    let formData = new FormData(formElement);

    for (let index = 0; index < this.images.length; index++)
      formData.append('file[]', this.images.item(index));

    formData.append('owner', owner);
    formData.append('ishouse', '' + this.ishouse);
    formData.append('furnished', '' + this.furnished);
    formData.append('renting', '' + this.renting);

    this.realEstateService.newRealEstate(formData).subscribe((returnCode: BackendReturnCode) => {
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

  images = null;

  selectImages(event) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.images = files;
      console.log(files);
    }
  }

}
