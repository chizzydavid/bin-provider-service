import { Schema, model, Document } from 'mongoose';

export interface IBin extends Document {
  bin_number: string;
  scheme: string;
  brand: string;
  type: string;
  country: string;
  bank_name: string;
  bank_url: string;
  bank_phone: string;
  bank_city: string;
  createdAt: Date;
  updatedAt: Date;
}

const BinSchema: Schema = new Schema(
  {
    bin_number: { type: String, unique: true, required: true },
    scheme: { type: String },
    brand: { type: String },
    type: { type: String },
    country: { type: String },
    bank_name: { type: String },
    bank_url: { type: String },
    bank_phone: { type: String },
    bank_city: { type: String }
  },
  {
    timestamps: true
  }
);

BinSchema.index({ bin_number: 1 }, { unique: true} );

const BinModel = model<IBin>('Bin', BinSchema) 

export default BinModel;


