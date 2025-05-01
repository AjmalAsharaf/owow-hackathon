// utils/responseBuilder.ts
import { Response } from "express";

interface ResponseData {
  message: string;
  data?: any;
  error?: any;
}


export const sendResponse = (
  res: Response,
  status: number,
  responseData: ResponseData
): Response => {
  const { message, data = null, error = null } = responseData;

  return res.status(status).json({
    message,
    data,
    error
  });
};