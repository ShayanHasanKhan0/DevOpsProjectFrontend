import { StatstabComponent } from './../components/statstab/statstab.component';
import { QuizlinkComponent } from './../components/quizlink/quizlink.component';
import { LoadingComponent } from './../components/loading/loading.component';
import { QuiztabsComponent } from './../components/quiztabs/quiztabs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExclusivemoduleRoutingModule } from './exclusivemodule-routing.module';


@NgModule({
  declarations: [
    QuiztabsComponent,
    LoadingComponent,
    QuizlinkComponent,
    StatstabComponent
  ],
  imports: [
    CommonModule,
    ExclusivemoduleRoutingModule
  ],
  exports: [
    QuiztabsComponent,
    LoadingComponent,
    StatstabComponent
  ]
})
export class ExclusivemoduleModule { }
