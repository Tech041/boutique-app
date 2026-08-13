import { Request, Response, NextFunction } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler";

interface DecodedToken {
  id: string;
  username: string;
}

export function authMiddleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ErrorHandler(401, "No token provided"));
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as DecodedToken;

      // Attach decoded user info to request
      (req as any).user = decoded;

      next();
    } catch (err: any) {
      if (err instanceof TokenExpiredError) {
        return next(new ErrorHandler(401, "Token expired"));
      }
      return next(new ErrorHandler(401, "Invalid JWT Token"));
    }
  };
}
