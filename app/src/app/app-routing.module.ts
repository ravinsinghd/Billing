import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "billing", pathMatch: "full" },
  {
    path: "billing",
    loadChildren: () =>
      import("./billing/billing.module").then((m) => m.BillingModule),
  },
  {
    path: "inventory",
    loadChildren: () =>
      import("./inventory/inventory.module").then((m) => m.InventoryModule),
  },
  {
    path: "product",
    loadChildren: () =>
      import("./product/product.module").then((m) => m.ProductModule),
  },
  {
    path: "customer",
    loadChildren: () =>
      import("./customer/customer.module").then((m) => m.CustomerModule),
  },
  {
    path: "insights",
    loadChildren: () =>
      import("./insights/insights.module").then((m) => m.InsightsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
