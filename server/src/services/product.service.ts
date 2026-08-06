import { Product } from "../models/upload.model";
import ErrorHandler from "../utils/errorHandler";

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
