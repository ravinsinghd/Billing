import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import { BillingRoutingModule } from "./billing-routing.module";
import { BillingComponent } from "./billing.component";
import { PipeModule } from "../pipes/pipe.module";
import { PrintComponent } from "./print/print.component";

@NgModule({
  imports: [
    CommonModule,
    BillingRoutingModule,
    FormsModule,
    PipeModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [BillingComponent, PrintComponent],
})
export class BillingModule {}
