import { ResponsesComponent } from './responses/responses.component';
import { ViewstatstabComponent } from './viewstatstab/viewstatstab.component';
import { ViewstatsComponent } from './viewstats/viewstats.component';
import { StatsComponent } from './stats/stats.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"statistics",component:StatsComponent},
  {path:"viewstats/:id",component:ViewstatsComponent},
  {path:"viewstatstab/:id",component:ViewstatstabComponent},
  {path:"responses/:id",component:ResponsesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
