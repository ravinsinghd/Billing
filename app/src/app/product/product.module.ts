import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ProductRoutingModule } from "./product-routing.module";
import { ProductComponent } from "./product.component";
import { ProductCrudComponent } from "./product-crud/product-crud.component";

@NgModule({
  imports: [CommonModule, ProductRoutingModule, FormsModule],
  declarations: [ProductComponent, ProductCrudComponent],
})
export class ProductModule {}
