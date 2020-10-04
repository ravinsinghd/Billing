import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { combineLatest, zip } from "rxjs";
import { map } from "rxjs/operators";

import { CommonServiceService } from "../shared/common-service.service";
import { HttpService } from "../shared/http.service";
import { Inventory, InventoryForList, Product } from "../type";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit {
  inventories: InventoryForList[] = [];
  constructor(
    private router: Router,
    private httpService: HttpService,
    private commonServiceService: CommonServiceService
  ) {}

  ngOnInit() {
    this.commonServiceService.getAllProducts();
    this.commonServiceService.getAllInventory();
    this.getProductAndInventories();
  }

  getProductAndInventories() {
    const inventory$ = this.commonServiceService.allInventories$;
    const product$ = this.commonServiceService.productsAsObject$;

    combineLatest(inventory$, product$).subscribe(
      ([inventories, productsMap]) => {
        const formattedInventories: InventoryForList[] = inventories.map(
          (inventory) => {
            return {
              ...inventory,
              productName: productsMap[inventory.productId],
            };
          }
        );
        this.inventories = formattedInventories;
      }
    );
  }

  deleteInventory(inventory: Inventory) {
    if (!inventory || !inventory._id) {
      this.commonServiceService.showMessage(
        "Something wrong.Inventory or inventory Id not available"
      );
      return;
    }
    this.httpService
      .deleteRequest("stocks", inventory._id)
      .subscribe((result: any) => {
        this.commonServiceService.getAllInventory();
        this.commonServiceService.showMessage(`Inventory deleted successfully`);
      });
  }

  editInventory(inventory: Inventory) {
    this.router.navigate(["/inventory/create", inventory._id]);
  }
}
