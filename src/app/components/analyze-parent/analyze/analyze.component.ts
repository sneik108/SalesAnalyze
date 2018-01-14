import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { IChartItem } from '../../../interfaces/IChartItem';
import { IDatatableSettings } from '../../../interfaces/IDatatableSettings';
import { ISaleInfoByCustomer } from '../../../interfaces/ISaleInfoByCustomer';
import { forEach } from '@angular/router/src/utils/collection';
import { GuidGeneratorService } from '../../../services/guid-generator.service';
import { SourceService } from '../../../services/source.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss'],
  providers: [GuidGeneratorService, SourceService]
})
export class AnalyzeComponent implements OnInit {

  carouselOne: NgxCarousel;
  salesByPeriodItems: IChartItem[] = [];

  //customers block
  customersCount: string;
  avgSalePointsOnCustomer: string;
  avgProductCountOnCustomer: string;
  avgSumOnCustomer: string;
  //top customers block
  topByProductQuantity: string;
  topBySum: string;
  top10BySum: string;
  topBySalesPoints: string;
  topByProductsVariety: string;
  //sales block
  soldProductsQuantity: string;
  soldProductsSum: string;
  avgPrice: string;
  transactionsPerDay: string;
  //charts
  allSalesForYear: IChartItem[];
  salesBySaleChannels: IChartItem[];
  //datatables
  salesInfoByCustomer: ISaleInfoByCustomer;
  salesBySaleChannelsSettings: IDatatableSettings = {
    showOperations: false, properties: [{
      property: 'id',
      header: 'Id',
      resizable: true,
      sortable: true
      // width: 500,
    },
    {
      property: 'customerName',
      header: 'Name',
      resizable: true,
      sortable: true
      // width: 100,
    },
    {
      property: 'salesSum',
      header: 'Sum',
      resizable: true,
      sortable: true
      // width: 100,
    }
    ]
  };

  constructor(private _helper: GuidGeneratorService, private _source: SourceService) { }

  ngOnInit() {
    const vm = this;
    // vm.fillSalesByPeriodItems();
    vm.fillCustomersBlock();
    vm.fillSalesBlock();
    vm.fillTopCustomersBlock();
    vm.fillChartWithSalesByMonth();
    vm.fillChartWithSalesByChannels();
    vm.fillTop10CustomersBySum();
    vm.fillDatatableWithCustomersInfo();
  }
  public onDatatableItemSelect(customerId: number){
    alert(customerId);
  }
  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
  }

  private fillCustomersBlock() {
    const vm= this;
    vm._source.customersCount().subscribe(resp => {
      vm.customersCount = resp.json();
    });
    vm._source.avgSalePointsOnCustomer().subscribe(resp => {
      vm.avgSalePointsOnCustomer = resp.json();
    });
    vm._source.avgProductCountOnCustomer().subscribe(resp => {
      vm.avgProductCountOnCustomer = resp.json();
    });
    vm._source.avgSumOnCustomer().subscribe(resp => {
      vm.avgSumOnCustomer = resp.json();
    });
  }

  private fillSalesBlock() {
    const vm = this;
    vm._source.soldProductsQuantity().subscribe(resp => {
      vm.soldProductsQuantity = resp.json();
    });
    vm._source.soldProductsSum().subscribe(resp => {
      vm.soldProductsSum = resp.json();
    });
    vm._source.avgPrice().subscribe(resp => {
      vm.avgPrice = resp.json();
    });
    vm._source.transactionsPerDay().subscribe(resp => {
      vm.transactionsPerDay = resp.json();
    });
  }

  private fillTopCustomersBlock(){
    const vm = this;
    const count = 1;

    vm._source.topByProductQuantity(count).subscribe(resp => {
      vm.topByProductQuantity = resp.json()[0].name;
    });
    vm._source.topBySum(count).subscribe(resp => {
      vm.topBySum = resp.json()[0].name;
    });
    vm._source.topBySalesPoints(count).subscribe(resp => {
      vm.topBySalesPoints = resp.json()[0].name;
    });
    vm._source.topByProductsVariety(count).subscribe(resp => {
      vm.topByProductsVariety = resp.json()[0].name;
    });
  }

  private fillTop10CustomersBySum(){
    const vm = this;
    const count = 10;
    vm._source.topBySum(count).subscribe(resp => {
      vm.top10BySum = resp.json();
    });
  }

  private fillChartWithSalesByMonth(){
    const vm = this;
    const year = 2017;
    vm._source.allSalesForYear(year).subscribe(resp => {
      vm.allSalesForYear = resp.json();
    });
  }

  private fillChartWithSalesByChannels(){
    const vm = this;
    vm._source.salesBySaleChannels().subscribe(resp => {
      vm.salesBySaleChannels = resp.json();
    });
  }

  private fillDatatableWithCustomersInfo(){
    const vm = this;
    vm._source.salesInfoByCustomer().subscribe(resp => {
      vm.salesInfoByCustomer = resp.json();
      console.log('vm.salesInfoByCustomer');
      console.log(vm.salesInfoByCustomer);
    });
  }

  private fillSalesByPeriodItems() {
    for (let i = 0; i < 10; i++) {
      this.salesByPeriodItems.push({ name: 'Test' + i, value: Math.round(Math.random() * (i + 1)) });
    }
  }
}
