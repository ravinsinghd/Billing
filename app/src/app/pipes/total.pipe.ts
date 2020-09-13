import { Pipe, PipeTransform } from "@angular/core";
import { Bill, BillItem } from "../type";

@Pipe({
  name: "total",
})
export class TotalPipe implements PipeTransform {
  transform(billItems: BillItem[]): any {
    if (!billItems || billItems.length === 0) {
      return 0.0;
    }
    return billItems.reduce((total, item) => {
      total = total + item.totalPrice;
      return total;
    }, 0);
  }
}
