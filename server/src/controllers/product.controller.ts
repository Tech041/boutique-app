import { NextFunction, Request, Response } from "express";
import {
  fetchProductBySlugService,
  fetchProductsByCollectionService,
  fetchProductsService,
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
