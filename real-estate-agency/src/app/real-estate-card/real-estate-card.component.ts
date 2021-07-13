import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FilesService } from '../files.service';
import { RealEstateCardInfo } from '../real-estate-card-info';

@Component({
  selector: 'app-real-estate-card',
  templateUrl: './real-estate-card.component.html',
  styleUrls: ['./real-estate-card.component.css']
})
export class RealEstateCardComponent implements OnInit {

  @Input() realEstateInfo: RealEstateCardInfo;
  imgurl: any;

  constructor(
    private filesService: FilesService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.filesService.getRandomRealEstatePicture(this.realEstateInfo._id).subscribe(picture => {
      let objURL = URL.createObjectURL(picture);
      this.imgurl = this.sanitizer.bypassSecurityTrustUrl(objURL);
    });
  }

}
