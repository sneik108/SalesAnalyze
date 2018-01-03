import { Component, OnInit } from '@angular/core';
import {ISelectOption} from '../../interfaces/ISelectOption';
import { EditMode } from '../user-profile/user-profile.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.scss']
})
export class LoadDataComponent implements OnInit {
  
  userList: ISelectOption[] = [];
  companyList: ISelectOption[] = [];
  featuresList: ISelectOption[] = [];
  currentUser = "";
  currentCompany = "";
  currentFeature = "";
  showData = false;
  showFeatureData = false;
  featureScore = 40;
  scoreEditModeEnabled = false;
  scoreBtnName = EditMode[EditMode.Edit];

  constructor() {
    this.fillUsers();
    this.fillCompanies();
    this.fillFeatures();
   }

  ngOnInit() {
  }

  fillUsers(){
    this.userList.push({id: 1, text: "David Yahalom"});
  }

  fillCompanies(){
    this.companyList.push({id: 1, text: "Nayatech"});
  }

  fillFeatures(){
    this.featuresList.push({id: 1, text: "Triggers"})
  }

  setUser(user){
    this.currentUser = user;
    if (user=== "") {
      this.showData = false; 
    } else {
      this.showData = true;
    }
  }
  setCompany(company){
    this.currentCompany = company;
    if (company=== "") {
      this.showData = false; 
    } else {
      this.showData = true;
    }
  }

  setFeature(feature){
    this.currentFeature = feature;
    if (feature=== "") {
      this.showFeatureData = false; 
    } else {
      this.showFeatureData = true;
    }
  }
  changeScoreEditModeEnabled(){
    this.scoreEditModeEnabled = !this.scoreEditModeEnabled;
    this.scoreBtnName = this.scoreEditModeEnabled ? EditMode[EditMode.Save] : EditMode[EditMode.Edit];
  }

  loadFile(){
    $('#fileLoad').click();
  }
}
