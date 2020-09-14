import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { map, switchMap } from "rxjs/operators";
import { HttpService } from "src/app/shared/http.service";
import { Bill } from "src/app/type";

@Component({
  selector: "app-print",
  templateUrl: "./print.component.html",
  styleUrls: ["./print.component.scss"],
})
export class PrintComponent implements OnInit {
  currentBill: Bill | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit() {
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
        this.currentBill = bill;
      });
  }
}
