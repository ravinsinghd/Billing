import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TotalPipe } from "./total.pipe";
import { RoundedTotalPipe } from "./roundedTotal.pipe";

@NgModule({
  imports: [CommonModule],
  declarations: [TotalPipe, RoundedTotalPipe],
  exports: [TotalPipe, RoundedTotalPipe],
})
export class PipeModule {}
