import { ExclusivemoduleModule } from './../exclusivemodule/exclusivemodule.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserprofileRoutingModule } from './userprofile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserprofileRoutingModule,
    FormsModule,
    RouterModule,
    ExclusivemoduleModule
  ]
})
export class UserprofileModule { }
