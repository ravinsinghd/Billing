import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { ProductRoutingModule } from "./product-routing.module";
import { ProductComponent } from "./product.component";
import { ProductCrudComponent } from "./product-crud/product-crud.component";

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  declarations: [ProductComponent, ProductCrudComponent],
})
export class ProductModule {}
