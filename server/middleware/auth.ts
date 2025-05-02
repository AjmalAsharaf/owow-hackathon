import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/responseBuilder";

export interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  // Check for authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    sendResponse(res, 401, { message: "Access denied. No token provided" });
    return; 
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    sendResponse(res, 401, { message: "Invalid token." });
    return; // Stop further execution
  }
};
