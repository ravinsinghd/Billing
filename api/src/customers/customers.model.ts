import * as mongoose from 'mongoose';

export interface Customer extends mongoose.Document {
  name: string;
  mobileNumber: string;
  city: string;
}

const customerSchema = new mongoose.Schema<Customer>({
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  city: { type: String },
});

export const CustomerModel = mongoose.model<Customer>(
  'Customer',
  customerSchema
);
