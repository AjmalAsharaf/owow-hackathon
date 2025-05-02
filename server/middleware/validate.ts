import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { sendResponse } from "../utils/responseBuilder";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if(!req.body || typeof req.body !== "object"){
      sendResponse(res, 400, { message: "Request body is required" });
      return
    }
    const { error } = schema.validate(req.body);
    if (error) {
        sendResponse(res, 400, { message: error.details[0].message });
        return;
    }
    next();
  };
};
