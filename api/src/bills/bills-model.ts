import * as mongoose from 'mongoose';

export interface BillItem {
  productId: string;
  quantity: number;
  pricePerItem: number;
  totalPrice: number;
}

export interface Bill extends mongoose.Document {
  billNumber: number;
  customerId: string;
  items: BillItem[];
  totalAmount: number;
  roundedAmount: number;
  createdDate: Date;
  modifiedDate: Date;
}

const billItemSchema = new mongoose.Schema<BillItem>({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  pricePerItem: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

const billSchema = new mongoose.Schema<Bill>({
  billNumber: { type: Number, required: true },
  customerId: { type: String, required: true },
  items: [billItemSchema],
  totalAmount: { type: Number, required: true },
  roundedAmount: { type: Number, required: true },
  createdDate: { type: Date, required: false },
  modifiedDate: { type: Date, required: false },
});

export const BillModel = mongoose.model<Bill>('Bill', billSchema);
