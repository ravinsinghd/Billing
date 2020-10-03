import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { CommonServiceService } from "src/app/shared/common-service.service";
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
  allProducts: Product[] = [];
  isEdit = false;
  productToEdit: Product | null | undefined = null;
  activatedRoute$: any;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonServiceService: CommonServiceService
  ) {}

  ngOnInit() {
    this.commonServiceService.allProducts$.subscribe((products) => {
      this.allProducts = products;
    });
    this.subscribeRouter();
  }

  subscribeRouter() {
    this.activatedRoute$ = this.activatedRoute.paramMap
      .pipe(
        map((params) => {
          const productId = params.get("productId");
          return productId;
        }),
        filter((productId) => !!productId)
      )
      .subscribe((productId) => this.editProduct(productId));
  }

  createProduct() {
    if (this.isEdit) {
      this.updateProduct();
    } else {
      const newProduct: Product = {
        name: this.productName,
        shortName: this.shortName,
      };
      this.httpService
        .postRequest<Product>("products", newProduct)
        .subscribe((result) => {
          this.commonServiceService.showMessage("Product created");
          this.router.navigate(["/product"]);
        });
    }
  }

  updateProduct() {
    if (!this.productToEdit) {
      return;
    }
    this.productToEdit.name = this.productName;
    this.productToEdit.shortName = this.shortName;
    this.httpService
      .postRequest<Product>("products/update", this.productToEdit)
      .subscribe((result) => {
        this.commonServiceService.showMessage("Product updated");
        this.commonServiceService.getAllProducts();
        this.router.navigate(["/product"]);
      });
  }

  editProduct(productId: string | null) {
    this.isEdit = true;
    if (!productId) {
      return;
    }
    this.productToEdit = this.allProducts.find(
      (product) => product._id === productId
    );

    if (!this.productToEdit) {
      return;
    }
    this.productName = this.productToEdit.name;
    this.shortName = this.productToEdit.shortName;
  }
}
