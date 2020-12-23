import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { CommonServiceService } from "src/app/shared/common-service.service";
import { HttpService } from "src/app/shared/http.service";
import { Bill } from "src/app/type";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  bills: Bill[] = [];
  billDate = new FormControl(new Date());
  totalAmount: number | null = null;

  constructor(
    private httpService: HttpService,
    private commonServiceService: CommonServiceService
  ) {}

  ngOnInit(): void {
    this.httpService.getRequest<Bill[]>("bills").subscribe((bills) => {
      this.bills = bills;
      this.totalAmount = this.bills.reduce((total, bill) => {
        if (!bill || !bill.totalAmount) {
          return total;
        }
        total = total + bill.totalAmount;
        return total;
      }, 0);
    });
  }
}
