import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { CommonServiceService } from "../shared/common-service.service";

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
    private matSnackBar: MatSnackBar,
    private router: Router,
    private commonServiceService: CommonServiceService
  ) {}

  ngOnInit() {
    this.getProductList();
    this.commonServiceService.allProducts$.subscribe((products) => {
      this.products = products;
    });
  }

  getProductList() {
    this.commonServiceService.getAllProducts();
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
        this.commonServiceService.showMessage(
          `Product ${result.name} deleted successfully`
        );
      });
  }

  editProduct(product: Product) {
    this.router.navigate(["/product/create", product._id]);
  }
}
