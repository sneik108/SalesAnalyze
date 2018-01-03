import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IChartItem } from '../../../interfaces/IChartItem';
import { IServerMostComplexityItem } from '../../../interfaces/IServerMostComplexityItem';
import { IServerData } from '../../../interfaces/IServerData';
import { IDatatableSettings } from '../../../interfaces/IDatatableSettings';
import { WindowBodyComponent } from '../../window-body/window-body.component';
import { HighlevelDbaDashboardComponent } from './highlevel-dba-dashboard/highlevel-dba-dashboard.component';
import { GuidGeneratorService } from '../../../services/guid-generator.service';
import { ServersService } from '../../../services/servers.service';
import { FormatMoneyPipe } from '../../../pipes/format-money.pipe';
import { ServerService } from '../../../services/server.service';
import { PdfGeneratorService } from '../../../services/pdf-generator.service';
import * as $ from 'jquery';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-executive-dashboard',
  templateUrl: './executive-dashboard.component.html',
  styleUrls: ['./executive-dashboard.component.scss'],
  providers: [GuidGeneratorService, ServersService, FormatMoneyPipe, ServerService, PdfGeneratorService]
  // entryComponents: [WindowBodyComponent, HighlevelDbaDashboardComponent]
})

export class ExecutiveDashboardComponent implements OnInit {


  @Output() openHighLevelDBADasboardEvent = new EventEmitter();
  // executiveDashboardComponentRef: ComponentRef<WindowBodyComponent>;

  @Input() costsItems: IServerData[];
  filteredServers: IServerData[];

  dataView = 'chartsView';

  // cost reduction
  serverMinCost = 0;
  serverMaxCost = 500000;
  costReductionValue: number;
  // sliderStep = 10000;

  mostExpensiveItems: any[] = [];
  mostComplexItems: IServerMostComplexityItem[] = [];
  summaryCostReduction: string;

  mainServersDatatableSettings: IDatatableSettings = {
    showOperations: false, properties: [{
      property: 'name',
      header: 'Server name',
      resizable: true,
      sortable: true
      // width: 500,
    },
    {
      property: 'value',
      header: 'Value',
      resizable: true,
      sortable: true
      // width: 100,
    }
    ]
  };

  mostComplexServersDatatableSettings: IDatatableSettings = {
    showOperations: false, properties: [
      {
        property: 'rank',
        header: 'Rank',
        resizable: false,
        sortable: false,
        width: 30,
      },
      {
        property: 'name',
        header: 'Name',
        resizable: false,
        sortable: true,
        width: 100,
      },
      {
        property: 'score',
        header: 'Complexity',
        resizable: false,
        sortable: true,
        width: 70,
      },
      {
        property: 'cost',
        header: 'Cost',
        resizable: false,
        sortable: true,
        width: 100,
      }
    ]
  };

  scrollStep = 70;
  scrollSummaryValue = 0;
  scrollAreaWidth: number;
  showScrollButtons = false;

  constructor(
    private guidGeneratorService: GuidGeneratorService,
    private formatMoneyPipe: FormatMoneyPipe,
    private serversService: ServersService,
    private pdfGeneratorService: PdfGeneratorService,
    private serverService: ServerService
  ) { }

  ngOnInit() {
    // this.fillCostsItems();
    this.filteredServers = this.costsItems;
    if (this.filteredServers.length > 12) {
      this.showScrollButtons = true;
    }
    this.fillServerMinAndMaxValues();
    this.fillMostExpensiveItems();
    this.fillMostComplexItems();
    // this.fillSummaryCostReduction();
    this.fillServerMinAndMaxValues();
  }

  fillMostExpensiveItems() {
    // const selectedServers = this.costsItems.map(server => server.name);
    // this.serversService.fillTopExpensiveServers(selectedServers);
    // this.serversService.mostExpensiveServers.subscribe(resp => {
    //   this.mostExpensiveItems = resp;
    // });
    const vm = this;
    vm.serverService.getMostExpensiverServers(5).subscribe(resp => {
      const serversWithCost = resp.json();
      let _tempServers: any[] = [];
      for (let index = 0; index < serversWithCost.length; index++) {
        const serverWithCost = serversWithCost[index];
        _tempServers.push(
          {
            name: serverWithCost.serverName,
            value: serverWithCost.cost,
            id: serverWithCost.id
          });
      }
      vm.mostExpensiveItems = _tempServers;
    });
  }

  fillMostComplexItems() {
    const vm = this;
    vm.serverService.getSortedServersByScore().subscribe(resp => {
      const servers = resp.json().content;
      const _tempServers: IServerMostComplexityItem[] = [];
      for (let index = 0; index < servers.length; index++) {
        const serverInfo = servers[index];
        _tempServers.push(
          {
            name: serverInfo.serverName,
            cost: serverInfo.cost,
            score: serverInfo.score,
            rank: index + 1,
            id: serverInfo.id
          }
        )
      }
      vm.mostComplexItems = _tempServers;
    })
  }

  fillCostsItems() {
    // console.log("chartItems");
    // console.log(this.costsItems);
    // for (let index = 10; index > 0; index--) {
    //   this.costsItems.push({name: 'Server ' + this.getRandomNumber(1, 50), value: 10 * index});
    // }
  }

  downloadReport() {
    this.pdfGeneratorService.downloadExecutiveReport();
  }
  // testChangeData() {
  //   for (let index = 10; index > 0; index--) {
  //     this.costsItems.push({name: 'Server ' + this.getRandomNumber(1, 50), value: 10 * index});
  //   }
  // }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  changeView() {
    if (this.dataView === 'chartsView') {
      this.dataView = 'tableView';
      this.showScrollButtons = false;
    } else {
      this.dataView = 'chartsView';
      this.showScrollButtons = true;
    }
  }

  openHighLevelDBADasboard() {
    const selectedServers = this.costsItems.map(item => item.name);
    this.openHighLevelDBADasboardEvent.emit(selectedServers);
  }

  onChartItemSelect(selectedServer) {
    const selectedServers: string[] = [];
    selectedServers.push(selectedServer);
    this.openHighLevelDBADasboardEvent.emit(selectedServers);
  }

  onDatatableItemSelect(serverName) {
    if (serverName) {
      const selectedServers: string[] = [];
      selectedServers.push(serverName);
      this.openHighLevelDBADasboardEvent.emit(selectedServers);
    }
  }

  fillSummaryCostReduction() {
    const vm = this;
    let costReduction = 0;
    this.costsItems.forEach(item => costReduction += item.cost);
    // vm.serversService.fillCostReductionSelectedServers(serverNames);
    // vm.serversService.costReductionSelectedServers.subscribe(
    //   costReduction => vm.summaryCostReduction = costReduction.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    // );
    // return this.guidGeneratorService.getSumFromArray(values);
  }

  filterServers(costReductionRestiction: number) {
    const vm = this;
    if (!costReductionRestiction) {
      return;
    }
    const filteredServers: IServerData[] = [];
    const sortedServers = vm.costsItems.sort((a, b) => {
      return b.value - a.value;
    });
    let sumOfAllowableCosts = 0;
    for (let index = 0; index < sortedServers.length; index++) {
      const server = sortedServers[index];
      if (server.cost > costReductionRestiction) {
        continue;
      }
      else if ((server.cost + sumOfAllowableCosts) > costReductionRestiction) {
        continue;
      }
      else {
        sumOfAllowableCosts += server.cost;
        filteredServers.push({ name: server.name, value: server.value, cost: server.cost });
      }
    }
    if (filteredServers.length > 11) {
      this.showScrollButtons = true;
    } else {
      this.showScrollButtons = false;
    }
    vm.filteredServers = filteredServers.sort((a, b) => {
      return a.value - b.value;
    });
    // this.fillServerMinAndMaxValues();
  }

  fillServerMinAndMaxValues() {
    const vm = this;
    if (!vm.filteredServers || vm.filteredServers.length === 0) {
      return;
    }
    else if (vm.filteredServers.length === 1) {
      vm.serverMaxCost = vm.filteredServers[0].cost;
      vm.serverMinCost = 0;
    }
    else {
      const costValues = vm.filteredServers.map(item => item.value);
      vm.serverMaxCost = vm.guidGeneratorService.getSumFromArray(costValues);
      vm.serverMinCost = vm.guidGeneratorService.getMinValueFromArray(costValues);
    }
  }

  leftScroll() {
    const vm = this;
    if (vm.scrollSummaryValue > 0) {
      vm.scrollSummaryValue -= vm.scrollStep;
    }

    $('#scrollable').scrollLeft(vm.scrollSummaryValue);
  }

  rightScroll() {
    const vm = this;
    this.scrollAreaWidth = $('#scrollable').width() - 200;
    if (vm.scrollSummaryValue < vm.scrollAreaWidth) {
      vm.scrollSummaryValue += vm.scrollStep;
    }

    $('#scrollable').scrollLeft(vm.scrollSummaryValue);
  }
}
