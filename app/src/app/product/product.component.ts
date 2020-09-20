import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

import { HttpService } from "../shared/http.service";
import { Product } from "../type";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private httpService: HttpService,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.httpService.getRequest<Product[]>("products").subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(product: Product) {
    if (!product || !product._id) {
      this.matSnackBar.open(
        "Something wrong.Product or product Id not available",
        undefined,
        { duration: 5000 }
      );
      return;
    }
    this.httpService
      .deleteRequest("products", product._id)
      .subscribe((result: any) => {
        this.getProductList();
        this.matSnackBar.open(
          `Product ${result.name} deleted successfully`,
          undefined,
          { duration: 5000 }
        );
      });
  }
}
