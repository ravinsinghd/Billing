import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CustomerCrudComponent } from "./customer-crud/customer-crud.component";
import { CustomerComponent } from "./customer.component";

const routes: Routes = [
  { path: "", component: CustomerComponent },
  {
    path: "create",
    component: CustomerCrudComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
