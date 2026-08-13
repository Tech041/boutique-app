// src/routes/visitorRoutes.ts
import { Router } from "express";
import {
  getVisitorStatsController,
  trackVisitorController,
} from "../controllers/tracker.controller";
import { authMiddleware } from "../middlewares/auth";

const trackerRouter = Router();

trackerRouter.post("/track", trackVisitorController);
trackerRouter.get("/stats", authMiddleware(), getVisitorStatsController);

export default trackerRouter;
