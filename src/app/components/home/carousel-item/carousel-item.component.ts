import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent implements OnInit {

  @Input() fromDatabase: string;
  @Input() fromDbShowShadow = true;
  @Input() fromDatabaseSecPart: string;
  @Input() toDatabase: string;
  @Input() toDbShowShadow = true;
  @Input() toDatabaseSecPart: string;
  @Input() dbToggleName: string;
  @Input() firstDbToggleOption: string;
  @Input() secondDbToggleOption: string;
  @Input() fromDatabaseImg: string;
  @Input() toDatabaseImg: string;
  @Input() toNameDatabase: string;
  @Input() fromNameDatabase: string;
  @Input() fromImgWidth = '43px';
  @Input() toImgWidth: string;

  constructor() { }

  ngOnInit() {
  }

}
