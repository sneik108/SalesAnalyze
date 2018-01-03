import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import {NgxCarousel} from 'ngx-carousel';
import { ColorPickerService } from "../../services/color-picker.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ColorPickerService]
})
export class HomeComponent implements OnInit {

  showHome = true;
  carouselOne: NgxCarousel;
  lineChartData = [{name: 'Jan', value: 9400000}, {name: 'Feb', value: 9300000}, {name: 'Mar', value: 9100000},
  {name: 'Apr', value: 9100000}, {name: 'May', value: 9100000},
  {name: 'Jun', value: 7500000}, {name: 'Jul', value: 8100000},
  {name: 'Aug', value: 7900000}, {name: 'Sep', value: 7500000},
  {name: 'Oct', value: 7200000}, {name: 'Nov', value: 6700000}, {name: 'Dec', value: ''}];

  costReductionChartItems: any[] = [{
    title: '1',
    value: 85,
    color: this.colorPickerService.selectColor('Atlantis')
  },
  {
    title: '2',
    value: 15,
    color: this.colorPickerService.selectColor('Alabaster'),
  }];

  costPerDatabaseChartItems: any[] = [{
    title: 'Oracle',
    value: 5100000,
    color: this.colorPickerService.selectColor('OrangeRedDonut')
  },
  {
    title: 'MSSQL',
    value: 1200000,
    color: this.colorPickerService.selectColor('DodgerBlue'),
  }
  ,
  {
    title: 'DB2',
    value: 350000,
    color: this.colorPickerService.selectColor('Atlantis'),
  }
  ,
  {
    title: 'Other',
    value: 52000,
    color: this.colorPickerService.selectColor('Botticelli'),
  }
  ];

  constructor(private router: Router, private colorPickerService: ColorPickerService) { }

  ngOnInit() {
    this.initCarousel();
  }

  initCarousel() {
    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 400,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner'
    };
  }

  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
 }

  destroyBody() {
    this.showHome = false;
  }

  goToMigrateWindow() {
    this.router.navigateByUrl('/dashboard/executive-screen');
  }



}
