import { Component } from "@angular/core";
import { CommonServiceService } from "./shared/common-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "billing";

  constructor(private commonServiceService: CommonServiceService) {}

  ngOnInit() {
    this.commonServiceService.getAllProducts();
  }
}
