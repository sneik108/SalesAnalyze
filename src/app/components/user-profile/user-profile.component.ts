import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Popup } from 'ng2-opd-popup';
import { ISelectOption } from '../../interfaces/ISelectOption';

export enum EditMode {
  Edit,
  Save
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})



export class UserProfileComponent implements OnInit {

  firstName: string;
  firstNameEditModeEnabled = false;
  firstNameBtnName = EditMode[EditMode.Edit];
  lastName: string;
  lastNameEditModeEnabled = false;
  lastNameBtnName = EditMode[EditMode.Edit];
  company: string;
  companyEditModeEnabled = false;
  companyBtnName = EditMode[EditMode.Edit];
  country: string;
  countryEditModeEnabled = false;
  countryBtnName = EditMode[EditMode.Edit];
  city: string;
  cityEditModeEnabled = false;
  cityBtnName = EditMode[EditMode.Edit];
  email: string;
  emailEditModeEnabled = false;
  emailBtnName = EditMode[EditMode.Edit];
  phoneNumber: string;
  phoneNumberEditModeEnabled = false;
  phoneNumberBtnName = EditMode[EditMode.Edit];

  popupOptions = {
    header: "Delete",
    color: "#FEB532", // red, blue.... 
    // widthProsentage: 40, // The with of the popou measured by browser width 
    animationDuration: 1, // in seconds, 0 = no animation 
    showButtons: true, // You can hide this in case you want to use custom buttons 
    confirmBtnContent: "Yes, remove my data", // The text on your confirm button 
    cancleBtnContent: "Cancel", // the text on your cancel button 
    confirmBtnClass: "btn btn-default", // your class for styling the confirm button 
    cancleBtnClass: "btn btn-primary", // you class for styling the cancel button 
    animation: "fadeInDown" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
  };

  moneyPerCpuList: ISelectOption[] = [];
  showMoneyPerCpu = true;
  showCoreCount = false;

  constructor(
    private _route: Router,
    private _popup: Popup
  ) {
    this.fillMoneyPerCpuList();
  }

  ngOnInit() {
    this.firstName = "David";
    this.lastName = "Yahalom";
    this.company = "Nayatech";
    this.country = "USA";
    this.city = "New York";
    this.email = "test@gmail.com";
    this.phoneNumber = "+340685005502";
  }
  recoverPassword() {
    this._route.navigateByUrl('/password-recovery');
  }

  changeFirstNameEditModeEnabled() {
    this.firstNameEditModeEnabled = !this.firstNameEditModeEnabled;
    this.firstNameBtnName = this.firstNameEditModeEnabled ? EditMode[EditMode.Save] : EditMode[EditMode.Edit];
  }
  changeLastNameEditModeEnabled() {
    this.lastNameEditModeEnabled = !this.lastNameEditModeEnabled;
    this.lastNameBtnName = this.lastNameEditModeEnabled ? EditMode[EditMode.Save] : EditMode[EditMode.Edit];
  }
  changeCompanyEditModeEnabled() {
    this.companyEditModeEnabled = !this.companyEditModeEnabled;
    this.companyBtnName = this.companyEditModeEnabled ? EditMode[EditMode.Save] : EditMode[EditMode.Edit];
  }
  changeCountryEditModeEnabled() {
    this.countryEditModeEnabled = !this.countryEditModeEnabled;
    this.countryBtnName = this.countryEditModeEnabled ? EditMode[EditMode.Save] : EditMode[EditMode.Edit];
  }
  changeCityEditModeEnabled() {
    this.cityEditModeEnabled = !this.cityEditModeEnabled;
    this.cityBtnName = this.cityEditModeEnabled ? EditMode[EditMode.Save] : EditMode[EditMode.Edit];
  }
  changeEmailEditModeEnabled() {
    this.emailEditModeEnabled = !this.emailEditModeEnabled;
    this.emailBtnName = this.emailEditModeEnabled ? EditMode[EditMode.Save] : EditMode[EditMode.Edit];
  }
  changePhoneNumberEditModeEnabled() {
    this.phoneNumberEditModeEnabled = !this.phoneNumberEditModeEnabled;
    this.phoneNumberBtnName = this.phoneNumberEditModeEnabled ? EditMode[EditMode.Save] : EditMode[EditMode.Edit];
  }
  removeProfile() {
    this._popup.show(this.popupOptions);
  }

  fillMoneyPerCpuList() {
    this.moneyPerCpuList.push({ id: 1, text: "100" });
    this.moneyPerCpuList.push({ id: 2, text: "200" });
    this.moneyPerCpuList.push({ id: 3, text: "300" });
  }

  changeState() {
    this.showMoneyPerCpu = !this.showMoneyPerCpu;
  }
}
