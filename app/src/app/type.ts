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
  _id?: string;
}

export interface InventoryForList extends Inventory {
  productName: string;
}

export interface ProductNameIdMap {
  [productName: string]: string;
}

export interface InventoryProductIdMap {
  [productId: string]: Inventory;
}

export interface BillItem {
  productId: string;
  productName: string;
  quantity: number;
  pricePerItem: number;
  totalPrice: number;
}

export interface Bill {
  billNumber: number | null;
  customerId: string | null;
  items: BillItem[];
  totalAmount: number | null;
  roundedAmount: number | null;
  _id?: string;
}

export interface Customer {
  name: string;
  mobileNumber: string;
  city: string;
}
