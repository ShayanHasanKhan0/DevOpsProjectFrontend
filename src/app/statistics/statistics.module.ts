import { FormsModule } from '@angular/forms';
import { ExclusivemoduleModule } from './../exclusivemodule/exclusivemodule.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { StatsComponent } from './stats/stats.component';
import { ViewstatsComponent } from './viewstats/viewstats.component';
import { ViewstatstabComponent } from './viewstatstab/viewstatstab.component';
import { ResponsesComponent } from './responses/responses.component';


@NgModule({
  declarations: [
    StatsComponent,
    ViewstatsComponent,
    ViewstatstabComponent,
    ResponsesComponent
  ],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    NgxPaginationModule,
    ExclusivemoduleModule,
    FormsModule
  ]
})
export class StatisticsModule { }
