import { Component, OnInit } from "@angular/core";
import { zip } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "../shared/http.service";
import { Inventory, InventoryForList, Product } from "../type";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit {
  inventories: InventoryForList[] = [];
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.getProductAndInventories();
  }

  getProductAndInventories() {
    const inventory$ = this.httpService.getRequest<Inventory[]>("stocks");
    const product$ = this.httpService.getRequest<Product[]>("products").pipe(
      map((products) => {
        return products.reduce((collection: any, product) => {
          if (product._id) {
            collection[product._id] = product.name;
          }
          return collection;
        }, {});
      })
    );

    zip(inventory$, product$).subscribe(([inventories, productsMap]) => {
      const formattedInventories: InventoryForList[] = inventories.map(
        (inventory) => {
          return {
            ...inventory,
            productName: productsMap[inventory.productId],
          };
        }
      );
      this.inventories = formattedInventories;
    });
  }
}
