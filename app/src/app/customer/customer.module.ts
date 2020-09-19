import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { CustomerComponent } from "./customer.component";
import { CustomerRoutingModule } from "./customer-routing.module";
import { CustomerCrudComponent } from "./customer-crud/customer-crud.component";

@NgModule({
  imports: [CommonModule, CustomerRoutingModule, FormsModule],
  declarations: [CustomerComponent, CustomerCrudComponent],
})
export class CustomerModule {}
