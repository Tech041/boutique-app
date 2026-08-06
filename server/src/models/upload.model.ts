import { Schema, model } from "mongoose";

export enum CollectionType {
  NewArrivals = "New Arrivals",
  BestSellers = "Best Sellers",
}

export interface IProduct {
  name: string;
  slug: string;
  image: string; // Cloudinary secure_url
  publicId: string; // Cloudinary public_id
  description: string;
  price: number;
  sizes: string[];
  collectionType: CollectionType; // renamed
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String, required: true },
    publicId: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sizes: {
      type: [String],
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: true,
    },
    collectionType: {
      type: String,
      enum: Object.values(CollectionType),
      required: true,
    },
  },
  { timestamps: true },
);

export const Product = model<IProduct>("Product", productSchema);
