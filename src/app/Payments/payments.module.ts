import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {  ReactiveFormsModule } from "@angular/forms";
import { NgxStripeModule } from "ngx-stripe";
import { PaymentsComponent } from "./payments.component";

@NgModule({
  declarations: [PaymentsComponent],
  imports: [CommonModule,ReactiveFormsModule,NgxStripeModule.forRoot("pk_test_51JMRtpSGur93abb0eCOR8peztj8jbW0aL1DZgBZ0oHxNn4kHeQa1A1xdsd2wyyOJz3lmGmhO152wmD6cxsbpG6A300LShgcVOz")],
  exports: [PaymentsComponent],
})
export class PaymentsModule {}
