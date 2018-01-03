import { Component, OnInit, Input } from '@angular/core';
import { ServerService } from '../../../../../services/server.service';
import { GuidGeneratorService } from '../../../../../services/guid-generator.service';
import { IFeature } from '../../../../../interfaces/IFeature';
import { IDetailedDBADashboardModel } from '../../../../../interfaces/IDetailedDBADashboardModel';

export interface IFeatureTreeItem {
  id: number;
  name: string;
  isExpanded: boolean;
  children: IFeatureTreeItem[];
}

@Component({
  selector: 'app-detailed-dba-dashboard',
  templateUrl: './detailed-dba-dashboard.component.html',
  styleUrls: ['./detailed-dba-dashboard.component.scss'],
  providers: [ServerService, GuidGeneratorService]
})
export class DetailedDbaDashboardComponent implements OnInit {

  @Input() detailedDBAModel: IDetailedDBADashboardModel;
  // selectedFeatures: IFeature[] = [];

  serverData: any[];
  featureTreeItems: IFeatureTreeItem[];
  filteredfeatureTreeItems: IFeatureTreeItem[];

  migrationCompatibilityItems: IFeatureTreeItem[] = [];

  _searchFeature: string;
  get searchFeature(): string {
    return this._searchFeature;
  }

  set searchFeature(value: string) {
    const vm = this;
    vm._searchFeature = value;
    const tempFeatureTreeItems = vm.featureTreeItems;
    vm.filteredfeatureTreeItems = tempFeatureTreeItems.filter(item => vm.stringHasTypedValue(item, value));
  }
  // featureItems: IFeature[];



  // nodes = [
  //   {
  //     id: 1,
  //     name: 'root1',
  //     children: [
  //       { id: 2, name: 'child1' },
  //       { id: 3, name: 'child2' }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     name: 'root2',
  //     children: [
  //       { id: 5, name: 'child2.1' },
  //       {
  //         id: 6,
  //         name: 'child2.2',
  //         children: [
  //           { id: 7, name: 'subsub' }
  //         ]
  //       }
  //     ]
  //   }
  // ];

  constructor(private serverService: ServerService, private guidGeneratorService: GuidGeneratorService) { }

  ngOnInit() {
    const vm = this;
    vm.serverService.getServers().subscribe(response => {
      vm.serverData = response.servers;
      vm.fillFeatureItems();
      vm.fillMigrationCompatibilityItems();
      vm.guidGeneratorService.scrollWindowToRight();
    });
  }

  fillFeatureItems() {
    const vm = this;
    const _featureTreeItems: IFeatureTreeItem[] = [];
    const selectedServer = vm.detailedDBAModel.hostName;

    for (let i1 = 0; i1 < vm.detailedDBAModel.features.length; i1++) {
      let feature = vm.detailedDBAModel.features[i1];
      let featureInfo: IFeatureTreeItem = { id: feature.id, name: feature.name, isExpanded: feature.isExpanded, children: [] };
      if (!feature.subFeatures) {
        _featureTreeItems.push(featureInfo);
        continue;
      }
      for (let i2 = 0; i2 < feature.subFeatures.length; i2++) {
        let subFeature = feature.subFeatures[i2];
        let subFeatureInfo: IFeatureTreeItem = { id: subFeature.id, name: subFeature.name, isExpanded: subFeature.isExpanded, children: [] };
        if (!subFeature.subFeaturesObjects) {
          featureInfo.children.push(subFeatureInfo);
          continue;
        }
        for (let i2 = 0; i2 < subFeature.subFeaturesObjects.length; i2++) {
          let subFeaturesObject = subFeature.subFeaturesObjects[i2];
          let subFeaturesObjectInfo: IFeatureTreeItem = { id: subFeaturesObject.id, name: subFeaturesObject.name, isExpanded: true, children: [] };
          subFeatureInfo.children.push(subFeaturesObjectInfo);
        }
        featureInfo.children.push(subFeatureInfo);
      }
      _featureTreeItems.push(featureInfo);
    }
    // const selectedInstances = vm.selectedFeatures.map(f => f.instanceName);
    // const selectedFeature = vm.detailedDBAModel.selectedFeature;

    // for (let index = 0; index < vm.serverData.length; index++) {
    //   const server = vm.serverData[index];
    //   if (selectedServer !== server.server_name) {
    //      continue;
    //   }
    //   if (!server.instances) {
    //     continue;
    //   }
    //   const instances = server.instances;

    //   for (let k = 0; k < instances.length; k++) {
    //     const instance = instances[k];
    //     // if (!vm.guidGeneratorService.elementWasSelected(instance.name, selectedInstances)) {
    //     //   continue;
    //     // }
    //     // const featureItems: IChartItem[] = [];

    //     if (!instance.features) {
    //       continue;
    //     }

    //     for (let i = 0; i < instance.features.length; i++) {
    //       // _featureList.push()
    //       const featureObject = instance.features[i];
    //       // if (featureObject.name === selectedFeature) {
    //       //   featureObject.isExpanded = true;
    //       //   featureObject.isActive = true;
    //       //   if (featureObject.children) {
    //       //     for (let i2 = 0; i2 < featureObject.children.length; i2++) {
    //       //       const child = featureObject.children[i2];
    //       //       child.isExpanded = true;
    //       //     }
    //       //     console.log('featureObject.children');
    //       //     console.log(featureObject.children);
    //       //   }
    //       // }
    //       // else {
    //       //   featureObject.isExpanded = false;
    //       //   featureObject.isActive = false;
    //       // }
    //       // if (!vm.guidGeneratorService.elementWasSelected(featureObject.name, selectedFeatures)) {
    //       //   continue;
    //       // }
    //       _featureTreeItems.push(featureObject);
    //     }
    //   }
    // }
    vm.featureTreeItems = _featureTreeItems;
    vm.filteredfeatureTreeItems = vm.featureTreeItems;
  }

  fillMigrationCompatibilityItems() {
    const vm = this;
    const _migrationCompatibilityItems: IFeatureTreeItem[] = [];

    const selectedServer = vm.detailedDBAModel.hostName;
    // const selectedInstances = vm.selectedFeatures.map(f => f.instanceName);
    // const selectedFeature = vm.detailedDBAModel.selectedFeature;

    for (let index = 0; index < vm.serverData.length; index++) {
      const server = vm.serverData[index];
      if (selectedServer !== server.server_name) {
        continue;
      }
      if (!server.instances) {
        continue;
      }
      const instances = server.instances;

      for (let k = 0; k < instances.length; k++) {
        const instance = instances[k];
        // if (!vm.guidGeneratorService.elementWasSelected(instance.name, selectedInstances)) {
        //   continue;
        // }
        // const featureItems: IChartItem[] = [];

        if (!instance.features) {
          continue;
        }
        if (!instance.migrationCompatibilityItems) {
          continue;
        }
        for (let index2 = 0; index2 < instance.migrationCompatibilityItems.length; index2++) {
          const migrCompItem = instance.migrationCompatibilityItems[index2];
          _migrationCompatibilityItems.push(migrCompItem);
        }
      }
    }
    vm.migrationCompatibilityItems = _migrationCompatibilityItems;

  }

  stringHasTypedValue(item: IFeatureTreeItem, searchValue: string) {
    if (searchValue) {
      return item.name.toLocaleLowerCase().includes(this.searchFeature.toLocaleLowerCase());
    }
    else {
      return true;
    }
  }
  clearFilter() {
    this.searchFeature = '';
  }
  // getFilledFeatureTreeItem(feature: any) {
  //   if (!feature.children || !feature.children.length || !feature.name || !feature.id) {
  //     return;
  //   }
  //   const name = feature.name;
  //   const id = feature.id;
  //   const treeFeatureItem: IFeatureTreeItem[] = [];
  //   treeFeatureItem.push()

  // }
}
