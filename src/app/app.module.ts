import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExecutiveScreenComponent } from './components/executive-screen/executive-screen.component';
import { FeatureDescriptionComponent } from './components/feature-description/feature-description.component';
import { WindowHeaderComponent } from './components/window-header/window-header.component';
import { HelpComponent } from './components/help/help.component';
import { MultiselectDropdownComponent } from './ui-components/multiselect-dropdown/multiselect-dropdown.component';
import { QuickSearchComponent } from './components/executive-screen/quick-search/quick-search.component';

import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {SelectModule} from 'ng2-select-compat';
import { SelectDropdownComponent } from './ui-components/select-dropdown/select-dropdown.component';
import { PlaybookComponent } from './components/playbook/playbook.component';
import { PlaybookSearchComponent } from './components/playbook/playbook-search/playbook-search.component';
import { SafeHtmlPipePipe } from './pipes/safe-html-pipe.pipe';
import { WindowBodyComponent } from './components/window-body/window-body.component';
import { AdvancedFilterComponent } from './components/executive-screen/advanced-filter/advanced-filter.component';
import { DatatableComponent } from './ui-components/datatable/datatable.component';
import { ChartComponent } from './ui-components/chart/chart.component';

import {IconHome, IconBarChart2, IconMenu, IconAlignJustify, IconRepeat,
   IconXCircle, IconSearch, IconHelpCircle, IconArrowLeft, IconArrowRight,
    IconBell, IconMoreHorizontal, IconChevronRight} from 'angular-feather';
import { DataTableModule } from 'angular-4-data-table-bootstrap-4';
import { UiSwitchModule } from 'ngx-toggle-switch/src';
import {NgxCarouselModule} from 'ngx-carousel';
import 'hammerjs';
import {ChartModule} from 'angular-highcharts';
import {AmChartsModule} from '@amcharts/amcharts3-angular';
import { ExecutiveDashboardComponent } from './components/executive-screen/executive-dashboard/executive-dashboard.component';
import { HighlevelDbaDashboardComponent } from './components/executive-screen/executive-dashboard/highlevel-dba-dashboard/highlevel-dba-dashboard.component';
import { DetailedDbaDashboardComponent } from './components/executive-screen/executive-dashboard/highlevel-dba-dashboard/detailed-dba-dashboard/detailed-dba-dashboard.component';
import { TreeModule } from 'angular-tree-component';
import { TreeComponent } from './ui-components/tree/tree.component';
import { SliderComponent } from './ui-components/slider/slider.component';
import { PdfGeneratorComponent } from './ui-components/pdf-generator/pdf-generator.component';
import { AnalyzeComponent } from './components/analyze-parent/analyze/analyze.component';
import { HomeComponent } from './components/home/home.component';
import { FormatMoneyPipe } from './pipes/format-money.pipe';
import { ScanComponent } from './components/scan/scan.component';
import { MigrationInfoCardComponent } from './components/executive-screen/executive-dashboard/highlevel-dba-dashboard/migration-info-card/migration-info-card.component';
import { GaugeComponent } from './ui-components/gauge/gauge.component';
import { ChartDonutComponent } from './ui-components/chart-donut/chart-donut.component';
import { CarouselItemComponent } from './components/home/carousel-item/carousel-item.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {LoadDataComponent} from './components/load-data/load-data.component';
import { ServicesComponent } from './components/services/services.component';
import { AnalyzeParentComponent } from './components/analyze-parent/analyze-parent.component';
import { SearchComponent } from './components/analyze-parent/search/search.component';
// import {PopupModule} from 'ng2-opd-popup';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    ExecutiveScreenComponent,
    FeatureDescriptionComponent,
    WindowHeaderComponent,
    HelpComponent,
    MultiselectDropdownComponent,
    QuickSearchComponent,
    SelectDropdownComponent,
    PlaybookComponent,
    PlaybookSearchComponent,
    SafeHtmlPipePipe,
    WindowBodyComponent,
    AdvancedFilterComponent,
    DatatableComponent,
    ExecutiveDashboardComponent,
    ChartComponent,
    HighlevelDbaDashboardComponent,
    DetailedDbaDashboardComponent,
    TreeComponent,
    SliderComponent,
    PdfGeneratorComponent,
    AnalyzeComponent,
    HomeComponent,
    FormatMoneyPipe,
    ScanComponent,
    MigrationInfoCardComponent,
    GaugeComponent,
    ChartDonutComponent,
    CarouselItemComponent,
    PasswordRecoveryComponent,
    UserProfileComponent,
    LoadDataComponent,
    ServicesComponent,
    AnalyzeParentComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MultiselectDropdownModule,
    SelectModule,
    DataTableModule,
    NgxCarouselModule,
    ChartModule,
    AmChartsModule,
    TreeModule,
    UiSwitchModule,
    IconHome, IconBarChart2, IconMenu, IconAlignJustify, IconRepeat,
     IconXCircle, IconSearch, IconHelpCircle, IconArrowLeft, IconArrowRight, IconBell, IconMoreHorizontal, IconChevronRight,
    BsDropdownModule.forRoot(),
    // PopupModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
