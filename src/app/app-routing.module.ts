import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {PasswordRecoveryComponent} from './components/password-recovery/password-recovery.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExecutiveScreenComponent } from './components/executive-screen/executive-screen.component';
import {PlaybookComponent} from './components/playbook/playbook.component';
import { FeatureDescriptionComponent } from './components/feature-description/feature-description.component';
import { HelpComponent } from './components/help/help.component';
import { HomeComponent } from './components/home/home.component';
import {AnalyzeParentComponent} from './components/analyze-parent/analyze-parent.component';
import {ScanComponent} from './components/scan/scan.component';
import {ServicesComponent} from './components/services/services.component';
import {UserProfileComponent} from './components/user-profile/user-profile.component';
import {LoadDataComponent} from './components/load-data/load-data.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'password-recovery',
    component: PasswordRecoveryComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'executive-screen',
        component: ExecutiveScreenComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      },
      {
        path: 'load-data',
        component: LoadDataComponent
      },
      {
        path: 'playbook',
        component: PlaybookComponent
      },
      {
        path: 'help',
        component: HelpComponent
      }
      ,
      {
        path: 'analyze',
        component: AnalyzeParentComponent
      }
      ,
      {
        path: 'scan',
        component: ScanComponent
      },
      {
        path: 'services',
        component: ServicesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
