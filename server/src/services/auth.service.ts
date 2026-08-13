import bcrypt from "bcryptjs";
import User, { type IUser } from "../models/auth.model";
import ErrorHandler from "../utils/errorHandler";

export const authService = async (
  username: string,
  password: string,
): Promise<IUser | null> => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new ErrorHandler(400, "User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ErrorHandler(400, "Invalid credential");
  }

  return user;
};
