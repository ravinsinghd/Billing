import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { BillingRoutingModule } from "./billing-routing.module";
import { BillingComponent } from "./billing.component";

@NgModule({
  declarations: [BillingComponent],
  imports: [CommonModule, BillingRoutingModule, FormsModule],
})
export class BillingModule {}
