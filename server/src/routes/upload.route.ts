import { Router } from "express";
import { uploadProductController} from "../controllers/upload.controller";
const uploadRouter = Router();

uploadRouter.post("/upload", uploadProductController);

export default uploadRouter;
