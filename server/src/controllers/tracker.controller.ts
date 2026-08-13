// src/controllers/visitorController.ts
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";
import { getVisitorStats, trackVisitor } from "../services/tracker.service";

export async function trackVisitorController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const visitorId = req.body.visitorId;
    if (!visitorId) {
      return next(new ErrorHandler(404, "Missing visitorId"));
    }

    await trackVisitor(visitorId);
    return res.status(200).json({ message: "Visitor tracked" });
  } catch (error) {
    if (error instanceof ErrorHandler) {
      // Service already set a statusCode
      return next(error);
    } else {
      // Unexpected plain Error, wrap it
      return next(new ErrorHandler(500, error || "Internal Server Error"));
    }
  }
}

export async function getVisitorStatsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const stats = await getVisitorStats(page, limit);
    return res.status(200).json(stats);
  } catch (error) {
    if (error instanceof ErrorHandler) {
      // Service already set a statusCode
      return next(error);
    } else {
      // Unexpected plain Error, wrap it
      return next(new ErrorHandler(500, error || "Internal Server Error"));
    }
  }
}
