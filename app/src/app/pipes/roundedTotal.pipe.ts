import { Pipe, PipeTransform } from "@angular/core";
import { BillItem } from "../type";

@Pipe({
  name: "roundedTotal",
})
export class RoundedTotalPipe implements PipeTransform {
  transform(billItems: BillItem[]): any {
    if (!billItems || billItems.length === 0) {
      return 0.0;
    }
    const total = billItems.reduce((total, item) => {
      total = total + item.totalPrice;
      return total;
    }, 0);
    return total;
  }
}
