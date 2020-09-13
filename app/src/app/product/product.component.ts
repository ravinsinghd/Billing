import { Component, OnInit } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Product } from "../type";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.httpService.getRequest<Product[]>("products").subscribe((products) => {
      this.products = products;
    });
  }
}
