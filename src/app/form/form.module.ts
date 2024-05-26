import { FormsModule } from '@angular/forms';
import { ExclusivemoduleModule } from './../exclusivemodule/exclusivemodule.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { CreateformComponent } from './createform/createform.component';

@NgModule({
  declarations: [
    CreateformComponent,
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    ExclusivemoduleModule,
    FormsModule
  ]
})
export class FormModule { }
