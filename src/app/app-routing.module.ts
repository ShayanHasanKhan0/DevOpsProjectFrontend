import { QuizlinkComponent } from './components/quizlink/quizlink.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { DashlayoutComponent } from './dashlayout/dashlayout/dashlayout.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { QuizmenuComponent } from './components/quizmenu/quizmenu.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:'signup', pathMatch:'full'},

  {path:"signup", component:SignupComponent},

  {path:"signin", component:SigninComponent},

  {path:"logout", component:LogoutComponent},

  {path:"quizlink/:userid/:formid", component:QuizlinkComponent},
  
  { path: 'd', component: DashlayoutComponent,
  children: [
    {path:"",loadChildren:()=>import('../app/dashlayout/dashlayout.module').then(mod=>mod.DashlayoutModule)}
  ]},

  // {path:"d",loadChildren:()=>import('../app/dashlayout/dashlayout.module').then(mod=>mod.DashlayoutModule)},
  // // userprofile
  // {path:"dashboarduser",loadChildren:()=>import('./userprofile/userprofile.module').then(mod=>mod.UserprofileModule)},
  // // payment
  // {path:"dashboardpayment",loadChildren:()=>import('./payment/payment.module').then(mod=>mod.PaymentModule)},
  // // statistics
  // {path:"dashboardstats",loadChildren:()=>import('./statistics/statistics.module').then(mod=>mod.StatisticsModule)},
  // // quiz menu
  // {path:"quizmenu", component:QuizmenuComponent},
  // // form create
  // {path:"dashboardformcreate",loadChildren:()=>import('./form/form.module').then(mod=>mod.FormModule)},
  // // form edit
  // {path:"dashboardformedit",loadChildren:()=>import('./editform/editform.module').then(mod=>mod.EditformModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
