import sharp from "sharp";
import streamifier from "streamifier";
import slugify from "slugify";
import { v2 as cloudinary } from "cloudinary";
import { Product } from "../models/upload.model";

export const uploadProductService = async (parsedData: any) => {
  // Convert image to WebP
  const webpBuffer = await sharp(parsedData.imageBuffer)
    .resize(1200)
    .webp({ quality: 80 })
    .toBuffer();

  // Upload to Cloudinary
  const result: any = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products", format: "webp" },
      (error, result) => (result ? resolve(result) : reject(error)),
    );
    streamifier.createReadStream(webpBuffer).pipe(stream);
  });

  // Slugify
  const slug = slugify(parsedData.name, { lower: true, strict: true });

  // Save product in DB
  const product = new Product({
    name: parsedData.name,
    slug,
    description: parsedData.description,
    price: Number(parsedData.price),
    sizes: parsedData.sizes,
    collectionType: parsedData.collectionType,
    image: result.secure_url,
    publicId: result.public_id,
  });

  await product.save();
  return product;
};
