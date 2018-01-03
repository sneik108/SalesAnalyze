import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {IMigrationInfo} from '../../../../../interfaces/IMigrationInfo';
import {IFeature} from '../../../../../interfaces/IFeature';

@Component({
  selector: 'app-migration-info-card',
  templateUrl: './migration-info-card.component.html',
  styleUrls: ['./migration-info-card.component.scss']
})

export class MigrationInfoCardComponent implements OnInit {

  @Output() onOpenDetailedDbaDashboardEvent = new EventEmitter();

  @Input() migrationInfo: IMigrationInfo;

  constructor() { }

  ngOnInit() {
  }

  openDetailedDbaDashboard() {
    const serverInfo: IFeature = {
      serverId: this.migrationInfo.serverId,
      instanceName: '',
      featureName: ''
    };
    this.onOpenDetailedDbaDashboardEvent.emit(serverInfo);
  }
}
