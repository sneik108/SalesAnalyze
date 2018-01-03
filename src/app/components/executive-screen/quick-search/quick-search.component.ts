import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ISelectOption } from '../../../interfaces/ISelectOption';
import { FormatMoneyPipe } from '../../../pipes/format-money.pipe';
import { ServerService } from '../../../services/server.service';
import { GuidGeneratorService } from '../../../services/guid-generator.service';
import { ServersService } from '../../../services/servers.service';
import { IFilterState } from '../../../interfaces/IFilterState';

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.scss'],
  providers: [ServerService, GuidGeneratorService, FormatMoneyPipe, ServersService]
})
export class QuickSearchComponent implements OnInit {

  @Output() deleteMeEvent = new EventEmitter();
  @Output() openAdvancedFilterEvent = new EventEmitter();
  @Output() openExecutiveDashboardEvent = new EventEmitter();
  // hideAdvancedFilter = true;
  @Input() selectedServers: string[] = [];
  multiselectFeaturesDisabled = false;
  @Input() selectedFeatures: string[] = [];
  @Input() selectedInstances: string[] = [];



  serverData: any[];

  serverList: IMultiSelectOption[] = [];
  featureList: IMultiSelectOption[] = [];
  databaseList: IMultiSelectOption[] = [];
  instanceList: IMultiSelectOption[] = [];

  selectedServerList: string[] = [];
  selectedFeatureList: string[] = [];

  oracleVersionList: ISelectOption[] = [];
  cpuNumberList: ISelectOption[] = [];
  userSuppliedTagsList: ISelectOption[] = [];




  constructor(
    private httpService: ServerService,
    private guidGeneratorService: GuidGeneratorService,
    private serversService: ServersService,
    private serverService: ServerService) { }

  ngOnInit() {
    this.loadServers();
  }

  // toggleAdvancedFilterVisability() {
  //   this.hideAdvancedFilter = !this.hideAdvancedFilter;
  // }
  loadServers() {
    const vm = this;

    // vm.httpService.getServers().subscribe((response) => {
    //   vm.serverData = response.servers;
    // });

    vm.httpService.getServerList().subscribe((resp) => {
      vm.fillServersList(resp.json());
    });

    vm.httpService.getFeaturesList().subscribe((resp) => {
      vm.fillFeatureList(resp.json());
    });
  }

  fillServersList(servers: any[]) {
    const vm = this;
    const _tempList: IMultiSelectOption[] = [];
    for (let index = 0; index < servers.length; index++) {
      _tempList.push({ id: servers[index].id, name: servers[index].serverName });
    }
    vm.serverList = _tempList;
  }

  fillFeatureList(features: any[]) {
    const vm = this;
    const _tempList: IMultiSelectOption[] = [];
    for (let index = 0; index < features.length; index++) {
      _tempList.push({ id: features[index].id, name: features[index].name });
    }
    vm.featureList = _tempList;
  }

  fillDatabasesList() {
    for (let index = 0; index < 10; index++) {
      this.databaseList.push({ id: index, name: 'Database ' + index });
    }
  }

  fillInstancesList() {
    for (let index = 0; index < 10; index++) {
      this.instanceList.push({ id: index, name: 'Instance ' + index });
    }
  }

  fillOracleVersionList() {
    for (let index = 0; index < 10; index++) {
      this.oracleVersionList.push({ id: index, text: '14.0.0.' + index });
    }
  }

  fillCpuNumberList() {
    for (let index = 0; index < 10; index++) {
      this.cpuNumberList.push({ id: index, text: '' + index * 2 });
    }
  }

  filluserSuppliedTagsList() {
    for (let index = 0; index < 10; index++) {
      this.userSuppliedTagsList.push({ id: index, text: 'Dev' + index + ' servers' });
    }
  }

  deleteMyself() {
    this.deleteMeEvent.emit();
  }

  openAdvanedFilter() {
    this.openAdvancedFilterEvent.emit();
  }

  useSelectedServers(selectedServers) {
    // this.fillServerSumAndMinCosts();
    if (selectedServers && selectedServers.length !== 0) {
      this.multiselectFeaturesDisabled = true;
    }
    else {
      this.multiselectFeaturesDisabled = false;
    }
    this.selectedServerList = selectedServers;
  }

  useSelectedFeatures(selectedFeatures) {
    const vm = this;
    let featureWithNames = [];
    for (let index = 0; index < selectedFeatures.length; index++) {
      featureWithNames.push({id: selectedFeatures[index].id, name: 'empty'});
    }
    const features = {'features': featureWithNames};
    vm.httpService.getServersListExceptFeatures(features).subscribe((resp) => {
      var filteredServers = resp.json();
      const _tempList: IMultiSelectOption[] = [];
      for (let index = 0; index < filteredServers.length; index++) {
        _tempList.push({ id: filteredServers[index].id, name: filteredServers[index].serverName });
      }
      vm.serverList = _tempList;
    });
  }

  openExecutiveDashboard(cost) {
    const vm = this;
    // this.costReductionValue = cost;
    // if (cost) {
    //   return;
    // }
    // else if (!cost) {
    //   cost = vm.serverMinCost;
    // }
    
    
    cost = cost === undefined || cost === null ? cost = 1000000000 : cost;
    vm.serverService.getServersByCostRestrict(cost).subscribe(resp => {
      const servers = resp.json();
      let chartItems: any[] = [];
      const tempServers: any[] = [];
      for(let i = 0; i < servers.length; i++){
        tempServers.push({
          name: servers[0].serverName,
          value: servers[0].score,
          id: servers[0].id
        })
      }
      console.log('eb');
      chartItems = tempServers;
      const filterState: IFilterState = {
        selectedItems: chartItems,
        selectedServersInFilter: vm.selectedServerList,
        selectedInstancesInFilter: null,
        selectedFeaturesInFilter: vm.selectedFeatureList,
      };
      this.openExecutiveDashboardEvent.emit(filterState);
    });
    
  }

  clearAllFilters() {
    this.selectedServerList = [];
    this.selectedFeatureList = [];
    this.selectedInstances = [];

    this.selectedFeatures = [];
    this.selectedServers = [];
    this.multiselectFeaturesDisabled = false;
  }
  // fillServerSumAndMinCosts() {
  //   const vm = this;
  //   vm.serversService.fillServersWithCost();
  //   vm.serversService.serversWithCost.subscribe((resp) => {
  //     const chartItems: any[] = resp;
  //     const values = chartItems.map(item => item.value);
  //     // vm.serverMaxCost = vm.guidGeneratorService.getSumFromArray(values);
  //     // vm.serverMinCost = vm.guidGeneratorService.getMinValueFromArray(values);
  //   });
  // }
}
