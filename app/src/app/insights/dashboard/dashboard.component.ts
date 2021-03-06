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
    const todayDate = new Date();
    const todayISOString = todayDate.toISOString();
    this.updateBills(todayISOString);
  }
  getRawBills() {
    const dateValue: Date = this.billDate.value;
    const dateIsoString = dateValue.toISOString();
    this.updateBills(dateIsoString);
  }

  updateBills(isoString: string) {
    this.httpService
      .getRequest<Bill[]>(`bills/raw/${isoString}`)
      .subscribe((bills) => {
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
