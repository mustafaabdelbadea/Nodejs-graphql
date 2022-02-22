import * as mongoose from "mongoose";

const ProductSchema = new mongoose.Schema<IPorduct>(
  {
    name: String
  }
);

export interface IPorduct {
  name: string;
}

export interface ProductDocument extends Document, IPorduct {}

export const ProductModel = mongoose.model<ProductDocument>("Product", ProductSchema);
