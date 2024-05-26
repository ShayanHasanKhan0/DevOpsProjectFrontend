import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
// import { IsloggedGuard } from '../guards/islogged.guard';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: 'plans', component: PaymentComponent},
  { path: 'checkout/:package', component: CheckoutComponent},
  // , canActivate: [IsloggedGuard] 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
