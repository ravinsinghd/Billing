import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { CommonServiceService } from "src/app/shared/common-service.service";
import { HttpService } from "src/app/shared/http.service";
import { Bill } from "src/app/type";

@Component({
  selector: "app-print",
  templateUrl: "./print.component.html",
  styleUrls: ["./print.component.scss"],
})
export class PrintComponent implements OnInit {
  currentBill: Bill | null = null;
  productObjects: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private commonServiceService: CommonServiceService
  ) {}

  ngOnInit() {
    this.commonServiceService.productsAsObject$.subscribe(
      (products) => (this.productObjects = products)
    );
    this.activatedRoute.paramMap
      .pipe(
        map((params) => {
          const billId = params.get("billId");
          return billId;
        })
      )
      .subscribe((billId) => this.getBillDetails(billId));
  }

  getBillDetails(billId: string | null) {
    this.httpService
      .getRequest<Bill>(`bills/${billId}`)
      .subscribe((bill: Bill) => {
        bill.items = bill.items.map((item) => {
          item.productName = this.productObjects[item.productId];
          return item;
        });
        this.currentBill = bill;
        setTimeout(() => {
          window.print();
        }, 0);
      });
  }
}
