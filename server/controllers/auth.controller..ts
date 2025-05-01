import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sendResponse } from "../utils/responseBuilder"; 

export const signup = async (req: Request, res: Response):  Promise<any> => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    sendResponse(res, 201, { message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
     sendResponse(res, 500, { message: "Server error",  error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response):  Promise<any>=> {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return sendResponse(res, 400, { message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return sendResponse(res, 400, { message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    sendResponse(res, 200, { message: "Login successful", data: { token } });
  } catch (error) {
    console.error("Login error:", error);
    sendResponse(res, 500, { message: "Server error",  error: (error as Error).message });
  }
};
