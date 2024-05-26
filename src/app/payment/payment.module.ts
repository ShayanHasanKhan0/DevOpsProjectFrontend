import { ExclusivemoduleModule } from './../exclusivemodule/exclusivemodule.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment/payment.component';
import { environment } from 'src/environments/environment';
import { NgxStripeModule } from 'ngx-stripe';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    PaymentComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    ExclusivemoduleModule,

    // Stripe
    NgxStripeModule.forRoot(environment.STRIPE_PUBLISHABLE_KEY), // Test/Live key
  ]
})
export class PaymentModule { }
