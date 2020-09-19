import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { zip } from "rxjs";
import { HttpService } from "../shared/http.service";
import {
  Bill,
  BillItem,
  Customer,
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
  mobileNumbers = [];
  searchNumber = "";

  constructor(private httpService: HttpService, private router: Router) {}

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
    this.currentBill.items = [...this.currentBill.items, billItem];
    this.productName = "";
    this.productQuantity = 0;
    const productField = document.getElementById("product");
    if (productField) {
      productField.focus();
    }
  }

  saveAndPrint() {
    const bill: Bill = {
      billNumber: null,
      customerId: null,
      totalAmount: null,
      roundedAmount: null,
      items: this.currentBill.items,
    };
    this.httpService.postRequest<Bill>("bills", bill).subscribe((bill) => {
      this.router.navigate([`/billing/print/${bill._id}`]);
    });
  }

  searchMobileNumber() {
    const customerSearch: Customer = {
      city: "",
      mobileNumber: this.searchNumber,
      name: "",
    };
    this.httpService
      .postRequest<Customer>("customers/search", customerSearch)
      .subscribe((result: any) => {
        this.mobileNumbers = result.map(
          (customer: Customer) => customer.mobileNumber
        );
      });
  }

  removeBillItem(index: number) {
    this.currentBill.items.splice(index, 1);
    this.currentBill.items = [...this.currentBill.items];
  }
}
