import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IChartItem} from '../../../../interfaces/IChartItem';
import {ServerService} from '../../../../services/server.service';
import {GuidGeneratorService} from '../../../../services/guid-generator.service';
import {IFeature} from '../../../../interfaces/IFeature';
import {PdfGeneratorService} from '../../../../services/pdf-generator.service';
import {IDetailedDBADashboardModel} from '../../../../interfaces/IDetailedDBADashboardModel';
import {IMigrationInfo} from '../../../../interfaces/IMigrationInfo';

// export interface IFeatureChart {
//   title: string;
//   seriesName: string;
//   chartItems: IChartItem[];
// }

@Component({
  selector: 'app-highlevel-dba-dashboard',
  templateUrl: './highlevel-dba-dashboard.component.html',
  styleUrls: ['./highlevel-dba-dashboard.component.scss'],
  providers: [ServerService, GuidGeneratorService, PdfGeneratorService]
})

export class HighlevelDbaDashboardComponent implements OnInit {

  @Output() openDetailedDBADashboard = new EventEmitter();
  @Output() closeDetailedDBADashboard = new EventEmitter();

  @Input() selectedServers: string[];



  // @Input() featuresItems: IChartItem[] = [];
  // featuresChartsData: IFeatureChart[] = [];
  serverData: any[];
  migrationInfos: IMigrationInfo[];

  constructor(
    private serverService: ServerService,
    private guidGeneratorService: GuidGeneratorService,
    private pdfGeneratorService: PdfGeneratorService
    ) { }

  ngOnInit() {
    const vm = this;
    vm.serverService.getServers().subscribe(response => {
      vm.serverData = response.servers;
      if (vm.selectedServers.length == 1) {
        vm.fillFeaturesItemsByServerId(vm.selectedServers[0])
      }
      else {
        vm.fillFeaturesItems();
      }
      
      vm.guidGeneratorService.scrollWindowToRight();
    });
  }

  fillFeaturesItemsByServerId(serverId){
    const vm = this;
    const _featureInfo: IMigrationInfo[] = [];
    vm.serverService.getServerWithScore(serverId).subscribe(resp => {
      const serverInfo = resp.json();
      _featureInfo.push({
        serverId: serverInfo.id,
        oracleVersion: serverInfo.oracleVersion,
        score: serverInfo.score,
        features: serverInfo.featureNames
      });
      vm.migrationInfos = _featureInfo;
    })
  }

  fillFeaturesItems() {
    const vm = this;
    const _featureInfo: IMigrationInfo[] = [];
    // vm.serverService.getServerWithScore(1).subscribe(resp => {
    //   const serverInfo = resp.json();
    //   _featureInfo.push({
    //     serverName: serverInfo.serverName,
    //     oracleVersion: serverInfo.oracleVersion,
    //     score: serverInfo.score,
    //     features: serverInfo.featureNames
    //   });
    //   vm.migrationInfos = _featureInfo;
    // })
    // const selectedServerArr = [];
    // if (vm.selectedServer) {
    //   selectedServerArr.push(vm.selectedServer);
    // }

    for (let index = 0; index < vm.serverData.length; index++) {
      const server = vm.serverData[index];
      let score = 0;
      let oracleVersion = '';
      let featuresNames: string[] = [];
      const featureItems: IChartItem[] = [];
      if (!vm.guidGeneratorService.elementWasSelected(vm.serverData[index].server_name, this.selectedServers)) {
         continue;
      }
      if (!vm.serverData[index].instances) {
        continue;
      }
      const instances = vm.serverData[index].instances;

      for (let k = 0; k < instances.length; k++) {
        const instance = instances[k];

        if (!instance.features) {
          continue;
        }

        for (let i = 0; i < instance.features.length; i++) {
          // _featureList.push()
          const featureObject = instance.features[i];
          // featuresNames.push(featureObject.name);
          score += featureObject.score;
          featureItems.push({name: featureObject.name, value: featureObject.score});
        }
        oracleVersion = instance.oracle_version;

      }
      featureItems.sort((a, b) => b.value - a.value);
      featuresNames = featureItems.map(feature => feature.name);
      if (featuresNames.length > 5) {
        featuresNames = vm.guidGeneratorService.slice(featuresNames, 0, 5);
      }
      _featureInfo.push(
        {
          serverId: server.server_name,
          oracleVersion: oracleVersion,
          score: score,
          features: featuresNames
        });
    }
    vm.migrationInfos = _featureInfo;
    // vm.featuresChartsData = _featureCharts;
    // for (let index = 5; index > 0; index--) {
    //   this.featuresItems.push({name: 'Feature ' + index, value: 10 * index});
    // }
  }

  showAllServersFeatures() {
    this.selectedServers = [];
    this.fillFeaturesItems();
    
  }

  onItemSelect(selectedInstances: IFeature) {
    this.sendDataToNextDashboard(selectedInstances);
  }

  downloadReport() {
    this.pdfGeneratorService.downloadHighLevelReport();
  }

  private sendDataToNextDashboard(featureInfo: IFeature) {
    const vm = this;
    let detailedDBAModel: IDetailedDBADashboardModel = null;
    vm.serverService.getServerWithCost(featureInfo.serverId).subscribe(resp => {
      let server = resp.json();
      detailedDBAModel = {
        hostName: server.serverName,
        cpuNumber: server.numberOfCPU,
        ipAddress: server.ip,
        oracleVersion: server.oracleVersion,
        cost: server.cost,
        features: server.features
      };
      vm.openDetailedDBADashboard.emit(detailedDBAModel);
    });
  }
}
