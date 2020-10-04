import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";

import { CommonServiceService } from "src/app/shared/common-service.service";
import { HttpService } from "src/app/shared/http.service";
import { Inventory, Product } from "src/app/type";

@Component({
  selector: "app-inventory-crud",
  templateUrl: "./inventory-crud.component.html",
  styleUrls: ["./inventory-crud.component.scss"],
})
export class InventoryCrudComponent implements OnInit {
  products: Product[] = [];
  productName: string | null = "";
  quantity: number | null = null;
  costPerUnit: number | null = 0;
  sellingPricePerUnit: number | null = null;
  purchaseDate: Date | null | string = null;
  expiryDate: Date | null | string = null;
  isEdit = false;
  activatedRoute$: any;
  allProductsSubscription: any;
  allInventories: Inventory[] = [];
  inventoryToEdit: Inventory | null | undefined = null;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private commonServiceService: CommonServiceService
  ) {}

  ngOnInit() {
    this.getAllInventories();
    this.getProductList();
    this.subscribeRouter();
  }

  getAllInventories() {
    this.commonServiceService.allInventories$.subscribe((inventories) => {
      this.allInventories = inventories;
    });
  }

  getProductList() {
    this.allProductsSubscription = this.commonServiceService.allProducts$.subscribe(
      (products) => {
        this.products = products;
      }
    );
  }

  subscribeRouter() {
    this.activatedRoute$ = this.activatedRoute.paramMap
      .pipe(
        map((params) => {
          const inventoryId = params.get("inventoryId");
          return inventoryId;
        }),
        filter((inventoryId) => !!inventoryId)
      )
      .subscribe((inventoryId) => this.editInventory(inventoryId));
  }

  editInventory(inventoryId: string | null) {
    this.isEdit = true;
    if (!inventoryId) {
      return;
    }
    this.inventoryToEdit = this.allInventories.find(
      (inventory) => inventory._id === inventoryId
    );

    if (!this.inventoryToEdit) {
      return;
    }
    const expiryDate = new Date(this.inventoryToEdit.expiryDate);
    const purchaseDate = new Date(this.inventoryToEdit.purchaseDate);
    this.expiryDate = expiryDate.toISOString().substr(0, 10);
    this.purchaseDate = purchaseDate.toISOString().substr(0, 10);
    this.quantity = this.inventoryToEdit.quantity;
    this.productName = this.getProductNameFromId(
      this.inventoryToEdit.productId
    );
    this.sellingPricePerUnit = this.inventoryToEdit.sellingPricePerUnit;
  }

  getProductIdFromName(name: string | null) {
    const selectedProduct = this.products.find(
      (product) => product.name === name
    );
    if (!selectedProduct) {
      return null;
    }
    return selectedProduct._id;
  }

  getProductNameFromId(id: string) {
    const selectedProduct = this.products.find((product) => product._id === id);
    if (!selectedProduct) {
      return null;
    }
    return selectedProduct.name;
  }

  saveInventory() {
    const productId = this.getProductIdFromName(this.productName);
    if (!productId) {
      this.commonServiceService.showMessage("Select product");
      return;
    }
    if (this.costPerUnit === null || this.costPerUnit === undefined) {
      this.commonServiceService.showMessage("Enter valid cost");
      return;
    }
    if (!this.expiryDate) {
      this.commonServiceService.showMessage("Enter expire date");
      return;
    }
    if (!this.purchaseDate) {
      this.commonServiceService.showMessage("Enter purchase date");
      return;
    }
    if (!this.quantity) {
      this.commonServiceService.showMessage("Enter quantity");
      return;
    }
    if (!this.sellingPricePerUnit) {
      this.commonServiceService.showMessage("Selling price per unit");
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

    if (this.isEdit && this.inventoryToEdit) {
      const updatedInventory = {
        ...inventory,
        _id: this.inventoryToEdit._id,
        createdDate: this.inventoryToEdit.createdDate,
      };
      this.httpService
        .postRequest("stocks/update", updatedInventory)
        .subscribe((result) => {
          this.commonServiceService.showMessage("Inventory Updated");
          this.router.navigate(["/inventory"]);
        });
    } else {
      this.httpService
        .postRequest<Inventory>("stocks", inventory)
        .subscribe((result) => {
          this.commonServiceService.showMessage("Inventory added");
          this.router.navigate(["/inventory"]);
        });
    }
  }
}
