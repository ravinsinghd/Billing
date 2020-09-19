import { Component, OnInit } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Customer } from "../type";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.scss"],
})
export class CustomerComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.httpService
      .getRequest<Customer[]>("customers")
      .subscribe((customers) => {
        this.customers = customers;
      });
  }
}
