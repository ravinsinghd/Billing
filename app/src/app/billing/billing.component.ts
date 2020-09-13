import { Component, OnInit } from "@angular/core";
import { zip } from "rxjs";
import { HttpService } from "../shared/http.service";
import {
  Bill,
  BillItem,
  Inventory,
  InventoryProductIdMap,
  Product,
  ProductNameIdMap,
} from "../type";

@Component({
  selector: "app-billing",
  templateUrl: "./billing.component.html",
  styleUrls: ["./billing.component.scss"],
})
export class BillingComponent implements OnInit {
  currentBill: Bill = {
    billNumber: null,
    customerId: null,
    items: [],
    roundedAmount: 0,
    totalAmount: 0,
  };
  inventories: InventoryProductIdMap = {};
  productNameIdMap: ProductNameIdMap = {};
  products: Product[] = [];
  productName: string = "";
  productQuantity: number = 0;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.getProductAndInventories();
  }

  getProductAndInventories() {
    const inventory$ = this.httpService.getRequest<Inventory[]>("stocks");
    const product$ = this.httpService.getRequest<Product[]>("products");
    zip(inventory$, product$).subscribe((result) => {
      const [inventories, products] = result;
      this.products = products;
      this.productNameIdMap = products.reduce((collection: any, product) => {
        collection[product.name] = product._id;
        return collection;
      }, {});
      this.inventories = inventories.reduce((collection: any, inventory) => {
        collection[inventory.productId] = inventory;
        return collection;
      }, {});
    });
  }
  addItem() {
    const productId = this.productNameIdMap[this.productName];
    const inventory = this.inventories[productId];
    const total = inventory.sellingPricePerUnit * this.productQuantity;
    const billItem: BillItem = {
      pricePerItem: inventory.sellingPricePerUnit,
      productId: productId,
      productName: this.productName,
      quantity: this.productQuantity,
      totalPrice: total,
    };
    this.currentBill.items.push(billItem);
    this.productName = "";
    this.productQuantity = 0;
  }
}
