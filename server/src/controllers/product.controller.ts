import { NextFunction, Request, Response } from "express";
import {
  deleteProduct,
  fetchProductBySlugService,
  fetchProductsByCollectionService,
  fetchProductsService,
  getProducts,
  updateProduct,
} from "../services/product.service";
import ErrorHandler from "../utils/errorHandler";

export const fetchProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await fetchProductsService(page, limit);

    res.json({ success: true, ...result });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      // Service already set a statusCode
      return next(error);
    } else {
      // Unexpected plain Error, wrap it
      return next(new ErrorHandler(500, error || "Internal Server Error"));
    }
  }
};

// fetch by slug

export const fetchProductBySlugController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { slug } = req.params;

    const product = await fetchProductBySlugService(slug as string);

    return res.status(200).json({ success: true, product });
  } catch (error: any) {
    if (error instanceof ErrorHandler) {
      // Service already set a statusCode
      return next(error);
    } else {
      // Unexpected plain Error, wrap it
      return next(new ErrorHandler(500, error || "Internal Server Error"));
    }
  }
};

// filter by collection type

export const fetchProductsByCollectionController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { collectionType } = req.params;

    if (!collectionType) {
      return next(new ErrorHandler(400, "Collection is required"));
    }

    const products = await fetchProductsByCollectionService(
      collectionType as string,
    );

    return res.status(200).json({ success: true, products });
  } catch (error: any) {
    if (error instanceof ErrorHandler) {
      // Service already set a statusCode
      return next(error);
    } else {
      // Unexpected plain Error, wrap it
      return next(new ErrorHandler(500, error || "Internal Server Error"));
    }
  }
};

// product management
// GET /products?page=1&limit=10
export const fetchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const result = await getProducts(page, limit);
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      // Service already set a statusCode
      return next(error);
    } else {
      // Unexpected plain Error, wrap it
      return next(new ErrorHandler(500, error || "Internal Server Error"));
    }
  }
};

// PUT /products/:id
export const editProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updated = await updateProduct(req.params.id as string, req.body);
    if (!updated) return next(new ErrorHandler(400, "Product not updated"));
    return res.status(201).json(updated);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      // Service already set a statusCode
      return next(error);
    } else {
      // Unexpected plain Error, wrap it
      return next(new ErrorHandler(500, error || "Internal Server Error"));
    }
  }
};

// DELETE /products/:publicId

export const removeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productId } = req.params; // product id from route
    if (!productId) {
      return next(new ErrorHandler(400, "ProductId is required"));
    }
    const result = await deleteProduct(productId as string);
    return res.status(200).json({ success: true, message: result });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      // Service already set a statusCode
      return next(error);
    } else {
      // Unexpected plain Error, wrap it
      return next(new ErrorHandler(500, error || "Internal Server Error"));
    }
  }
};
