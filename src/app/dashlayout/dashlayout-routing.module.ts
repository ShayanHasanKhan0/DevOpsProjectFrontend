import { HelpComponent } from './../help/help/help.component';
import { QuizmenuComponent } from './../components/quizmenu/quizmenu.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'dashboarduser/userprofile', pathMatch:'full'},
  // userprofile
  {path:"du",loadChildren:()=>import('../userprofile/userprofile.module').then(mod=>mod.UserprofileModule)},
  // payment
  // {path:"dp",loadChildren:()=>import('../payment/payment.module').then(mod=>mod.PaymentModule)},
  // statistics
  // {path:"ds",loadChildren:()=>import('../statistics/statistics.module').then(mod=>mod.StatisticsModule)},
  // quiz menu
  {path:"quizmenu", component:QuizmenuComponent},
  // help
  {path:"help", component:HelpComponent},
  // form create
  {path:"df",loadChildren:()=>import('../form/form.module').then(mod=>mod.FormModule)},
  // form edit
  // {path:"dfe",loadChildren:()=>import('../editform/editform.module').then(mod=>mod.EditformModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashlayoutRoutingModule { }
