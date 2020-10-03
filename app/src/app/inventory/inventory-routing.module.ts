import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { InventoryCrudComponent } from "./inventory-crud/inventory-crud.component";
import { InventoryComponent } from "./inventory.component";

const routes: Routes = [
  { path: "", component: InventoryComponent },
  {
    path: "create",
    component: InventoryCrudComponent,
  },
  {
    path: "create/:inventoryId",
    component: InventoryCrudComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {}
