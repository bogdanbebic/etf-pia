import { Component, OnInit } from '@angular/core';
import * as c3 from "c3";
import { RealEstateService } from '../real-estate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private realEstateService: RealEstateService
  ) { }

  ngOnInit(): void {
    this.generateCharts();
  }

  generateCharts() {
    this.generatePerCityChart();
    this.generateHousesChart();
    this.generateApartmentsChart();
  }

  generatePerCityChart() {
    this.realEstateService.getDashboardPerCityData().subscribe((data: any[]) => {
      let columns = [];
      data.forEach(element => {
        columns.push([element._id, element.total]);
      });

      c3.generate({
        bindto: '#chart1',
        interaction: {
          enabled: false
        },
        data: {
          type: 'bar',
          columns: columns
        }
      });
    });
  }

  generateHousesChart() {
    this.realEstateService.getDashboardHousesRentSaleData().subscribe((data: any[]) => {
      let columns = [];
      data.forEach(element => {
        columns.push([element._id ? 'For Rent' : 'For Sale', element.total]);
      });

      c3.generate({
        bindto: '#chart2',
        interaction: {
          enabled: false
        },
        data: {
          type: 'bar',
          columns: columns
        }
      });
    });
  }

  generateApartmentsChart() {
    this.realEstateService.getDashboardApartmentsRentSaleData().subscribe((data: any[]) => {
      let columns = [];
      data.forEach(element => {
        columns.push([element._id ? 'For Rent' : 'For Sale', element.total]);
      });

      c3.generate({
        bindto: '#chart3',
        interaction: {
          enabled: false
        },
        data: {
          type: 'bar',
          columns: columns
        }
      });
    });
  }

}
