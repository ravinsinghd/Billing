import { Component, OnInit } from "@angular/core";
import { HttpService } from "../shared/http.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  ngOnInit() {}

  getProductList() {
    this.httpService.get("products").subscribe((products) => {
      console.log(products);
    });
  }
}
