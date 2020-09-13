export interface Product {
  name: string;
  shortName: string;
  _id?: string;
}

export interface Inventory {
  productId: string;
  purchaseDate: Date;
  quantity: number;
  costPerUnit: number;
  sellingPricePerUnit: number;
  expiryDate: Date;
}

export interface InventoryForList extends Inventory {
  productName: string;
}
