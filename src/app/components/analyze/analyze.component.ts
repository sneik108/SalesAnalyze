import { Component, OnInit } from '@angular/core';
import {NgxCarousel} from 'ngx-carousel';
import { IChartItem } from '../../interfaces/IChartItem';
import { forEach } from '@angular/router/src/utils/collection';
import {GuidGeneratorService} from '../../services/guid-generator.service';
 
@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss'],
  providers: [GuidGeneratorService]
})
export class AnalyzeComponent implements OnInit {

  carouselOne: NgxCarousel;
  salesByPeriodItems: IChartItem[] = [];

  constructor(private _helper: GuidGeneratorService) { }

  ngOnInit() {
    this.fillSalesByPeriodItems();
  }

  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
 }
 private fillSalesByPeriodItems(){
   for(let i = 0; i < 10; i++) {
     this.salesByPeriodItems.push({name: 'Test' + i, value: Math.round(Math.random() * (i + 1))});
   }    
 }
}
