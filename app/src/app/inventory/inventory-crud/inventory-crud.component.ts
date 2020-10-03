import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "src/app/shared/http.service";
import { Inventory, Product } from "src/app/type";

@Component({
  selector: "app-inventory-crud",
  templateUrl: "./inventory-crud.component.html",
  styleUrls: ["./inventory-crud.component.scss"],
})
export class InventoryCrudComponent implements OnInit {
  products: Product[] = [];
  productName: string = "";
  quantity: number | null = null;
  costPerUnit: number | null = null;
  sellingPricePerUnit: number | null = null;
  purchaseDate: Date | null = null;
  expiryDate: Date | null = null;
  isEdit = false;

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.httpService.getRequest<Product[]>("products").subscribe((products) => {
      this.products = products;
    });
  }

  getProductIdFromName(name: string) {
    const selectedProduct = this.products.find(
      (product) => product.name === name
    );
    if (!selectedProduct) {
      return null;
    }
    return selectedProduct._id;
  }

  saveInventory() {
    const productId = this.getProductIdFromName(this.productName);
    if (!productId) {
      alert("Select product");
      return;
    }
    if (!this.costPerUnit) {
      alert("Enter valid cost");
      return;
    }
    if (!this.expiryDate) {
      alert("Enter expire date");
      return;
    }
    if (!this.purchaseDate) {
      alert("Enter purchase date");
      return;
    }
    if (!this.quantity) {
      alert("Enter quantity");
      return;
    }
    if (!this.sellingPricePerUnit) {
      alert("Selling price per unit");
      return;
    }
    const inventory: Inventory = {
      productId: productId,
      costPerUnit: this.costPerUnit,
      expiryDate: this.expiryDate,
      purchaseDate: this.purchaseDate,
      quantity: this.quantity,
      sellingPricePerUnit: this.sellingPricePerUnit,
    };
    this.httpService
      .postRequest<Inventory>("stocks", inventory)
      .subscribe((result) => {
        alert("Inventory added");
        this.router.navigate(["/inventory"]);
      });
  }
}
