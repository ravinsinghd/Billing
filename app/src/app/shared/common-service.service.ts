import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject, Subject } from "rxjs";
import { Product } from "../type";
import { HttpService } from "./http.service";

@Injectable({
  providedIn: "root",
})
export class CommonServiceService {
  allProducts$ = new BehaviorSubject<Product[]>([]);

  constructor(
    private httpService: HttpService,
    private matSnackBar: MatSnackBar
  ) {
    this.getAllProducts();
  }

  getAllProducts() {
    this.httpService.getRequest<Product[]>("products").subscribe((products) => {
      this.allProducts$.next(products);
    });
  }

  showMessage(message: string) {
    this.matSnackBar.open(message, undefined, { duration: 5000 });
  }
}
