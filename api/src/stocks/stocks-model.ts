import * as mongoose from 'mongoose';

export interface Stock extends mongoose.Document {
  productId: string;
  purchaseDate: Date;
  quantity: number;
  costPerUnit: number;
  sellingPricePerUnit: number;
  expiryDate: Date;
  createdDate: Date;
  modifiedDate: Date;
}

const StockSchema = new mongoose.Schema<Stock>({
  productId: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  quantity: { type: Number, required: true },
  costPerUnit: { type: Number, required: true },
  sellingPricePerUnit: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
  createdDate: { type: Date, required: true },
  modifiedDate: { type: Date, required: true },
});

export const StockModel = mongoose.model<Stock>('Stock', StockSchema);
