import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { IMultiSelectOption } from "angular-2-dropdown-multiselect";
import { IAdvanceFilterTableItem } from "../../../interfaces/IAdvanceFilterTableItem";
import { IDatatableSettings } from "../../../interfaces/IDatatableSettings";
import { ServerService } from "../../../services/server.service";
import { GuidGeneratorService } from "../../../services/guid-generator.service";
import {IFilterState} from '../../../interfaces/IFilterState';
import * as $ from 'jquery';

@Component({
  selector: "app-advanced-filter",
  templateUrl: "./advanced-filter.component.html",
  styleUrls: ["./advanced-filter.component.scss"],
  providers: [ServerService, GuidGeneratorService]
})
export class AdvancedFilterComponent implements OnInit {
  @Output() showExecutiveDashboardEvent = new EventEmitter();
  @Output() showQuickSearchEvent = new EventEmitter();

  serverData: any[];

  serverList: IMultiSelectOption[] = [];
  featureList: IMultiSelectOption[] = [];
  multiselectFeaturesDisabled = false;
  databaseList: IMultiSelectOption[] = [];
  instanceList: IMultiSelectOption[] = [];
  oracleVersionList: IMultiSelectOption[] = [];
  cpuNumberList: IMultiSelectOption[] = [];
  userSuppliedTagsList: IMultiSelectOption[] = [];

  selectedServerList: string[] = [];
  selectedFeatureList: string[] = [];
  selectedDatabaseList: string[] = [];
  selectedInstanceList: string[] = [];
  selectedOracleVersionList: string[] = [];
  selectedCpuNumberList: string[] = [];
  selectedUserSuppliedTagsList: string[] = [];


  selectedServersInDatatable: any[] = [];

  filterParameters: any = {
    serverFilters: [],
    instanceFilters: [],
    featureFilters: [],
    databaseFilters: [],
    tagFilters: [],
    numberOfCPUFilters: [],
    oracleVersionFilters: []
  }

  datatableSource: IAdvanceFilterTableItem[] = [];
  datatableSettings: IDatatableSettings = {
    showOperations: true,
    properties: [
      {
        property: "serverName",
        header: "Server name",
        resizable: true,
        sortable: true,
        width: 200
      },
      {
        property: "instanceName",
        header: "Instance name",
        resizable: true,
        sortable: true,
        width: 200
      },
      {
        property: "databaseName",
        header: "Database Name",
        resizable: true,
        sortable: true,
        width: 200
      }
    ]
  };

  constructor(
    private serverService: ServerService,
    private guidGeneratorService: GuidGeneratorService
  ) {}

  ngOnInit() {
    this.loadDataForFilters();
  }

  loadDataForFilters() {
    const vm = this;


    vm.serverService.getFilteredServers(vm.filterParameters).subscribe(response => {
      let serverData = response.json().content;
      vm.fillDatatableSource(serverData);
    });
    vm.serverService.getServerList().subscribe((resp) => {
      vm.fillServersList(resp.json());
    });

    vm.serverService.getFeaturesList().subscribe((resp) => {
      vm.fillFeatureList(resp.json());
    });

    vm.serverService.getDatabasesList().subscribe((resp) => {
      vm.fillDatabasesList(resp.json());
    });

    vm.serverService.getInstanceList().subscribe((resp) => {
      vm.fillInstancesList(resp.json());
    });

    vm.serverService.getTagsList().subscribe((resp) => {
      vm.filluserSuppliedTagsList(resp.json());
    });

    vm.serverService.getAvailableCpu().subscribe(resp => {
      vm.fillCpuNumberList(resp.json().listCPU);
    });

    vm.serverService.getAvailableOracleVersions().subscribe(resp => {
      vm.fillOracleVersionList(resp.json().oracleVersions);
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

  fillDatabasesList(databases: any[]) {
    const vm = this;
    const _tempList: IMultiSelectOption[] = [];
    for (let index = 0; index < databases.length; index++) {
      _tempList.push({ id: databases[index].id, name: databases[index].name });
    }
    vm.databaseList = _tempList;
  }

  fillInstancesList(instances: any[]) {
    const vm = this;
    const _tempList: IMultiSelectOption[] = [];
    for (let index = 0; index < instances.length; index++) {
      _tempList.push({ id: instances[index].id, name: instances[index].name });
    }
    vm.instanceList = _tempList;
  }

  fillOracleVersionList(oracleVersionList: any[]) {
    // for (let index = 0; index < 10; index++) {
    //   this.oracleVersionList.push({id: index, name: '14.0.0.' + index});
    // }
    const vm = this;
    const _oracleVersionList: IMultiSelectOption[] = [];
    for (let index = 0; index < oracleVersionList.length; index++) {
      _oracleVersionList.push({
        id: oracleVersionList[index],
        name: oracleVersionList[index]
      });
    }
    vm.oracleVersionList = _oracleVersionList;
  }

  fillCpuNumberList(cpuList: any[]) {
    const vm = this;
    const _cpuNumberList: IMultiSelectOption[] = [];
    for (let index = 0; index < cpuList.length; index++) {
      _cpuNumberList.push({
        id: cpuList[index],
        name: cpuList[index]
      });
    }
    vm.cpuNumberList = _cpuNumberList;
  }

  filluserSuppliedTagsList(tags: any[]) {
    const vm = this;
    const _tempList: IMultiSelectOption[] = [];
    for (let index = 0; index < tags.length; index++) {
      _tempList.push({ id: tags[index].id, name: tags[index].name });
    }
    vm.userSuppliedTagsList = _tempList;
  }

  fillDatatableSource(serverData) {
    const vm = this;
    const _tempData: IAdvanceFilterTableItem[] = [];
    for (let index = 0; index < serverData.length; index++) {
      const serverInfo = serverData[index];
      _tempData.push({
        databaseName: serverInfo.dataBaseName,
        instanceName: serverInfo.instanceName,
        serverName: serverInfo.serverName
      });
    }
    vm.datatableSource = _tempData;
  }

  showExecutiveDashboard() {
    const vm = this;
    let chartItems: any[] = [];
    let tempServers: any[] = [];
    let selectedServers: string[] = [];
    let cost = 1000000000;;
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
      chartItems = tempServers;
      const filterState: IFilterState = {
        selectedItems: chartItems,
        selectedServersInFilter: vm.selectedServerList,
        selectedInstancesInFilter: null,
        selectedFeaturesInFilter: vm.selectedFeatureList,
      };
      this.showExecutiveDashboardEvent.emit(filterState);
    });
  }

  useSelectedServers(selectedServers) {
    if (selectedServers && selectedServers.length !== 0) {
      this.multiselectFeaturesDisabled = true;
    }
    else{
      this.multiselectFeaturesDisabled = false;
    }
    this.selectedServerList = selectedServers;
  }

  useSelectedInstances(selectedInstances) {
    this.selectedInstanceList = selectedInstances;
  }

  useSelectedDatabases(selectedDatabases) {
    this.selectedDatabaseList = selectedDatabases;
  }

  useSelectedOracleVersions(selectedOracleVersions) {
    this.selectedOracleVersionList = selectedOracleVersions;
  }

  useSelectedCpuNumber(selectedCpuNumber) {
    this.selectedCpuNumberList = selectedCpuNumber;
  }

  useSelectedFeatures(selectedFeatures) {
    const vm = this;
    let featureWithNames = [];
    for (let index = 0; index < selectedFeatures.length; index++) {
      featureWithNames.push({id: selectedFeatures[index].id, name: 'empty'});
    }
    const features = {'features': featureWithNames};
    vm.serverService.getServersListExceptFeatures(features).subscribe((resp) => {
      var filteredServers = resp.json();
      const _tempList: IMultiSelectOption[] = [];
      for (let index = 0; index < filteredServers.length; index++) {
        _tempList.push({ id: filteredServers[index].id, name: filteredServers[index].serverName });
      }
      vm.serverList = _tempList;
    });

  }

  useSelectedTags(selectedTags) {
    this.selectedUserSuppliedTagsList = selectedTags;
  }

  filterTable() {
    const vm = this;
    const _newdatatableSource: IAdvanceFilterTableItem[] = [];
    const serversForFilter = vm.selectedServerList;
    const parameters = {
      serverFilters: vm.getObjectForFilterParameter(vm.selectedServerList),
      instanceFilters: vm.getObjectForFilterParameter(vm.selectedInstanceList),
      featureFilters: vm.getObjectForFilterParameter(vm.selectedFeatureList),
      databaseFilters: vm.getObjectForFilterParameter(vm.selectedDatabaseList),
      tagFilters: vm.getObjectForFilterParameter(vm.selectedUserSuppliedTagsList),
      numberOfCPUFilters: [],
      oracleVersionFilters: []
    }
    vm.serverService.getFilteredServers(parameters).subscribe(resp => {
      let filteredServers = resp.json().content;
      vm.fillDatatableSource(filteredServers);
    });

    this.datatableSource = _newdatatableSource;
  }

  getObjectForFilterParameter(parameters: any[]){
    let _tempParamsObjects = [];
    for (let index1 = 0; index1 < parameters.length; index1++) {
      let param = parameters[index1];
      _tempParamsObjects.push({id: param, name: 'appendix'});
    }
    return _tempParamsObjects;
  }

  addSelectedServerToList(elem: any) {
    // if (this.elementWasSelected(serverName, this.selectedServersInDatatable)) {
    //   this.selectedServersInDatatable.push(serverName);
    // }
    if (!this.selectedServersInDatatable.length) {
        this.selectedServersInDatatable.push(elem);
    } else {
      if (this.guidGeneratorService.elementIArray(elem.key, this.selectedServersInDatatable.map((item) => item.key))) {
        this.selectedServersInDatatable = $.grep(this.selectedServersInDatatable, (item) => item.key !== elem.key);
      } else {
        this.selectedServersInDatatable.push(elem);
      }
    }
  }

  clearAllFilters() {
    this.selectedServerList = [];
    this.selectedInstanceList = [];
    this.selectedDatabaseList = [];
    this.selectedOracleVersionList = [];
    this.selectedCpuNumberList = [];
    this.selectedFeatureList = [];
    this.multiselectFeaturesDisabled = false;
    this.selectedUserSuppliedTagsList = [];
  }
  returnToQuickSearch() {
    this.showQuickSearchEvent.emit();
  }
}
