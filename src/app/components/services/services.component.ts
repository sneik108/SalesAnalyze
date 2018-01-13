import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  private pathToApi = 'http://migvisor.kruts.net:8080/migvisor/';
  private headers: Headers;

  constructor() { }

    

  ngOnInit() {
  }

}
