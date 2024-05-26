import { HelpComponent } from './../help/help/help.component';
import { ExclusivemoduleModule } from './../exclusivemodule/exclusivemodule.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashlayoutRoutingModule } from './dashlayout-routing.module';
import { DashlayoutComponent } from './dashlayout/dashlayout.component';
import { DashpanelComponent } from '../components/dashpanel/dashpanel.component';
import { QuizmenuComponent } from '../components/quizmenu/quizmenu.component';


@NgModule({
  declarations: [
    DashlayoutComponent,
    DashpanelComponent,
    QuizmenuComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    DashlayoutRoutingModule,
    ExclusivemoduleModule
  ]
})
export class DashlayoutModule { }
