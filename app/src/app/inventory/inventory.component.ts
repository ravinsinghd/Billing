import { Component, OnInit } from "@angular/core";
import { HttpService } from "../shared/http.service";
import { Inventory } from "../type";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit {
  inventories: Inventory[] = [];
  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.getInventories();
  }

  getInventories() {
    this.httpService.getRequest<Inventory[]>("stocks").subscribe((result) => {
      this.inventories = result;
    });
  }
}
