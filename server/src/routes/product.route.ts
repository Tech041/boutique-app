import { Router } from "express";
import {
  fetchProductBySlugController,
  fetchProductsByCollectionController,
  fetchProductsController,
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/all-products", fetchProductsController);
productRouter.get("/product/:slug", fetchProductBySlugController);
productRouter.get(
  "/collection/:collectionType",
  fetchProductsByCollectionController,
);

export default productRouter;
