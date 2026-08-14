import { IProduct, Product } from "../models/upload.model";
import ErrorHandler from "../utils/errorHandler";
import { v2 as cloudinary } from "cloudinary";

export const fetchProductsService = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  // Randomize using $sample
  const products = await Product.aggregate([
    { $sample: { size: limit * page } }, // get enough random docs
    { $skip: skip },
    { $limit: limit },
  ]);

  const total = await Product.countDocuments();

  return {
    products,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

// fetch by slug

export const fetchProductBySlugService = async (slug: string) => {
  const product = await Product.findOne({ slug });

  if (!product) {
    throw new ErrorHandler(404, "Product not found");
  }

  return product;
};

// filter by collection

/**
 * Fetch up to 9 random products by collection type
 */
export const fetchProductsByCollectionService = async (
  collectionType: string,
) => {
  // Use MongoDB aggregation to filter, randomize, and limit
  const products = await Product.aggregate([
    { $match: { collectionType } }, // filter by collection
    { $sample: { size: 9 } }, // randomize and limit to 9
  ]);

  return products;
};

// product management

// Fetch paginated products
export const getProducts = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
    await Product.countDocuments(),
  ]);

  return { products, total, page, pages: Math.ceil(total / limit) };
};

// Update product (edit fields except image/publicId)
export const updateProduct = async (
  id: string,
  data: Partial<Omit<IProduct, "image" | "publicId">>,
) => {
  return await Product.findByIdAndUpdate(id, data, { returnDocument: "after" });
};

// Delete product by MongoDB _id and Cloudinary publicId
export const deleteProduct = async (productId: string) => {
  // 1. Find product by id
  const product = await Product.findById(productId);
  if (!product) {
    throw new ErrorHandler(404, "Product not found");
  }

  // 2. Delete both Cloudinary image and DB record in parallel
  await Promise.all([
    cloudinary.uploader.destroy(product.publicId),
    Product.findByIdAndDelete(productId),
  ]);

  return { message: "Product deleted successfully" };
};
