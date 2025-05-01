import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import User from "../models/User";

const router = express.Router();

const signUpSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("candidate", "employer").required(),
});

// Define Joi validation schema for Login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

interface ErrorResponse {
  message: string;
}
// Define structured response types
interface SuccessResponse {
  message: string;
  token?: string;
}
// POST /signup
router.post(
  "/signup",
  async (
    req: Request,
    res: Response<SuccessResponse | ErrorResponse>
  ): Promise<any> => {
    const { error } = signUpSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const { name, email, password, role } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role,
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Server error" });
    }
  }
);

// POST /login
router.post(
  "/login",
  async (
    req: Request,
    res: Response<SuccessResponse | ErrorResponse>
  ): Promise<any> => {
    const { error } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });
      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables.");
      }
      const token = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: "1h",
      });
      res.json({ message: "Login successful", token });
    } catch (error) {
      console.error("Signup Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
