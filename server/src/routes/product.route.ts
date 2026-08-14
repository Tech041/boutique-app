import { Router } from "express";
import {
  editProduct,
  fetchProductBySlugController,
  fetchProducts,
  fetchProductsByCollectionController,
  fetchProductsController,
  removeProduct,
} from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth";

const productRouter = Router();

productRouter.get("/all-products", fetchProductsController);
productRouter.get("/product/:slug", fetchProductBySlugController);
productRouter.get(
  "/collection/:collectionType",
  fetchProductsByCollectionController,
);

// product management
productRouter.get("/fetch-all", authMiddleware(), fetchProducts);
productRouter.patch("/update/:id", authMiddleware(), editProduct);
productRouter.delete("/delete/:productId", authMiddleware(), removeProduct);

export default productRouter;
