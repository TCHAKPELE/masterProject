import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from '@core/common.module';

import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';


import { HomeComponent } from './home.component';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreCardModule } from '@core/components/core-card/core-card.module';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroSearchComponent } from '../sample/hero-search/hero-search.component';
import { MessageComponent } from '../sample/message/message.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


const routes = [

  //{
  // path: 'home',
  //component: HomeComponent,
  //data: { animation: 'home' }
  //},
  {
    path: 'heroes',
    component: HeroesComponent,
    data: { animation: 'heroes' }
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { animation: 'dashboard' }
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent,
    data: { animation: 'detail' }
  }
];

@NgModule({
  declarations: [ HomeComponent, HeroesComponent, DashboardComponent, HeroSearchComponent, HeroDetailComponent, MessageComponent],
  imports: [RouterModule.forChild(routes), ContentHeaderModule, TranslateModule, CoreCommonModule, CoreCardModule, BrowserModule, NgbModule, CommonModule, NgSelectModule, NgxDatatableModule],
  exports: [ HomeComponent],

})
export class SampleModule { }
