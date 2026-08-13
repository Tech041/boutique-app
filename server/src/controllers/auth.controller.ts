import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorHandler";
import { authService } from "../services/auth.service";


export const authController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { username, password } = req.body;

  try {
    const user = await authService(username, password);
    if (!user) {
      return next(new ErrorHandler(400, "User not found"));
    }

    const token = jwt.sign(
      { id: user._id.toString(), username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    return res.status(200).json({ message: "Login successful", token });
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
