import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/responseBuilder";

export interface AuthenticatedRequest extends Request {
  user?: { userId: string; role: string };
}

export const authenticate = (roles: string[] = []) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    
    // Check for authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      sendResponse(res, 401, { message: "Access denied. No token provided" });
      return; 
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
      req.user = { userId: decoded.userId, role: decoded.role };


      if (roles.length && !roles.includes(req.user.role)) {
        sendResponse(res, 403, { message: "Forbidden: You do not have permission to perform this action" });
        return;
      }

      next();
    } catch (err) {
      sendResponse(res, 401, { message: "Invalid token." });
      return; // Stop further execution
    }
  };
};
