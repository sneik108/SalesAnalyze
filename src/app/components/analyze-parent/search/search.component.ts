import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() openAnalyzeDashboardEvent = new EventEmitter();
  @Input() selectedYear: string[] = [];
  yearsList: IMultiSelectOption[] = [];

  constructor() { }

  ngOnInit() {
    const year = 2017;
    this.yearsList.push({id: 1, name: year.toString() });
  }

  openAnalyzeDashboard(){
    this.openAnalyzeDashboardEvent.emit();
  }
}
