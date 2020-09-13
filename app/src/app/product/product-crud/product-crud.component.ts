import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "src/app/shared/http.service";
import { Product } from "src/app/type";

@Component({
  selector: "app-product-crud",
  templateUrl: "./product-crud.component.html",
  styleUrls: ["./product-crud.component.scss"],
})
export class ProductCrudComponent implements OnInit {
  productName: string = "";
  shortName: string = "";

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit() {}

  createProduct() {
    const newProduct: Product = {
      name: this.productName,
      shortName: this.shortName,
    };
    this.httpService
      .postRequest<Product>("products", newProduct)
      .subscribe((result) => {
        alert("Product created");
        this.router.navigate(["/product"]);
      });
  }
}
