import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "src/app/shared/http.service";
import { Customer } from "src/app/type";

@Component({
  selector: "app-customer-crud",
  templateUrl: "./customer-crud.component.html",
  styleUrls: ["./customer-crud.component.scss"],
})
export class CustomerCrudComponent implements OnInit {
  customerName = "";
  mobileNumber = "";
  city = "";

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit() {}

  saveCustomer() {
    if (!this.mobileNumber) {
      alert("Enter customer");
      return;
    }

    const customer: Customer = {
      name: this.customerName,
      city: this.city,
      mobileNumber: this.mobileNumber,
    };

    this.httpService.postRequest("customers", customer).subscribe((result) => {
      alert("Customer added");
      this.router.navigate(["/customer"]);
    });
  }
}
