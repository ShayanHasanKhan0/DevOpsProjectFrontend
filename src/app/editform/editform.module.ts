import { FormsModule } from '@angular/forms';
import { ExclusivemoduleModule } from './../exclusivemodule/exclusivemodule.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditformRoutingModule } from './editform-routing.module';
import { EditformComponent } from './editform/editform.component';

@NgModule({
  declarations: [
    EditformComponent,
  ],
  imports: [
    CommonModule,
    EditformRoutingModule,
    ExclusivemoduleModule,
    FormsModule
  ]
})
export class EditformModule { }
