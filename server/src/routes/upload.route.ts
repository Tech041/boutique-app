import { Router } from "express";
import { uploadProductController } from "../controllers/upload.controller";
import { authMiddleware } from "../middlewares/auth";
const uploadRouter = Router();

uploadRouter.post("/upload", authMiddleware(), uploadProductController);

export default uploadRouter;
