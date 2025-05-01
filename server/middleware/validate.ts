import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { sendResponse } from "../utils/responseBuilder";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (error) {
        sendResponse(res, 400, { message: error.details[0].message });
        return;
    }
    next();
  };
};
