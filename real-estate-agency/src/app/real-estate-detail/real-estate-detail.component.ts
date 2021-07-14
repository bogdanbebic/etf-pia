import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../authorization.service';
import { BackendReturnCode } from '../backend-return-code';
import { FilesService } from '../files.service';
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
  pictures: string[];
  alreadyMadeOffer: boolean;

  imgurls = [];

  username: string;

  payment: boolean;

  minDate: Date;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private route: ActivatedRoute,
    private realEstateService: RealEstateService,
    private filesService: FilesService,
    private sanitizer: DomSanitizer,
    private authorizationService: AuthorizationService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.username = this.authorizationService.currentUser.username;
    this.getRealEstate();
    this.minDate = new Date();
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
      this.pictures = realEstate.pictures;
      this.alreadyMadeOffer = realEstate.offers.includes(this.username);
      this.pictures.forEach(picturePath => {
        this.filesService.getPicture(picturePath).subscribe(picture => {
          const objURL = URL.createObjectURL(picture);
          this.imgurls.push(this.sanitizer.bypassSecurityTrustUrl(objURL));
        });
      });
    });
  }

  rent() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    const startDate = this.range.value.start;
    const endDate = this.range.value.end;
    this.realEstateService.rent(id, this.username, startDate, endDate).subscribe((ok: BackendReturnCode) => {
      if (ok.ok) {
        this.snackBar.open("Rent offer success!", "OK", {
          duration: 2000
        });
      }
      else {
        this.snackBar.open("Rent offer failed!", "OK", {
          duration: 2000
        });
      }
    });
  }

  buy() {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.realEstateService.buy(id, this.username).subscribe((ok: BackendReturnCode) => {
      if (ok.ok) {
        this.snackBar.open("Buy offer success!", "OK", {
          duration: 2000
        });
      }
      else {
        this.snackBar.open("Buy offer failed!", "OK", {
          duration: 2000
        });
      }
    });
  }

}
