import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Inventory, Product } from "../type";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class CommonServiceService {
  allProducts$ = new BehaviorSubject<Product[]>([]);
  allInventories$ = new BehaviorSubject<Inventory[]>([]);
  productsAsObject$ = this.getProductsAsObject();

  constructor(
    private httpService: HttpService,
    private matSnackBar: MatSnackBar
  ) {
    this.getAllProducts();
  }

  getAllProducts() {
    this.httpService.getRequest<Product[]>("products").subscribe((products) => {
      this.allProducts$.next(products);
    });
  }

  getAllInventory() {
    this.httpService
      .getRequest<Inventory[]>("stocks")
      .subscribe((inventories) => {
        this.allInventories$.next(inventories);
      });
  }

  getProductsAsObject() {
    return this.allProducts$.pipe(
      map((products) => {
        return products.reduce((collection: any, product) => {
          if (product._id) {
            collection[product._id] = product.name;
          }
          return collection;
        }, {});
      })
    );
  }

  showMessage(message: string) {
    this.matSnackBar.open(message, undefined, { duration: 5000 });
  }
}
