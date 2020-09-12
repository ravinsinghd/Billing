import * as mongoose from 'mongoose';

export interface Product extends mongoose.Document {
  name: string;
  shortName: string;
}

const productSchema = new mongoose.Schema<Product>({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
});

export const ProductModel = mongoose.model<Product>('Product', productSchema);
