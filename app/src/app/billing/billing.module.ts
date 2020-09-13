import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { BillingRoutingModule } from "./billing-routing.module";
import { BillingComponent } from "./billing.component";
import { PipeModule } from "../pipes/pipe.module";

@NgModule({
  imports: [CommonModule, BillingRoutingModule, FormsModule, PipeModule],
  declarations: [BillingComponent],
})
export class BillingModule {}
