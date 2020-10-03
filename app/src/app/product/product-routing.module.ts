import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductCrudComponent } from "./product-crud/product-crud.component";

import { ProductComponent } from "./product.component";

const routes: Routes = [
  { path: "", component: ProductComponent },
  {
    path: "create",
    component: ProductCrudComponent,
  },
  {
    path: "create/:productId",
    component: ProductCrudComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
