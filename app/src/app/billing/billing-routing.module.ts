import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BillingComponent } from "./billing.component";
import { PrintComponent } from "./print/print.component";

const routes: Routes = [
  { path: "", component: BillingComponent },
  { path: "print/:billId", component: PrintComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillingRoutingModule {}
