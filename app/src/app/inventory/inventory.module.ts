import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { InventoryRoutingModule } from "./inventory-routing.module";
import { InventoryComponent } from "./inventory.component";
import { InventoryCrudComponent } from "./inventory-crud/inventory-crud.component";

@NgModule({
  declarations: [InventoryComponent, InventoryCrudComponent],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class InventoryModule {}
