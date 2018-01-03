import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {ISelectOption} from '../../interfaces/ISelectOption';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent implements OnInit {

  @Input() name: string;
  @Input() selectOptions: ISelectOption[];
  @Input() textPlaceholder: string;
  items = ["24", "4", "34"];

  @Output() selectItemEvent = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  selected(value: any): void {
    this.selectItemEvent.emit(value);
  }
}
