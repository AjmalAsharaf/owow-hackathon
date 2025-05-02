import { Response } from "express";
import Job from "../models/Job";
import { sendResponse } from "../utils/responseBuilder";
import { AuthenticatedRequest } from "../middleware/auth";

export const postJob = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { title, description, company, location, requiredSkills, salary } =
    req.body;

  try {
    // Create a new job posting
    const job = new Job({
      title,
      description,
      company,
      location,
      requiredSkills,
      salary,
      postedBy: req.user?.userId,
    });

    // Save the job to the database
    await job.save();

    sendResponse(res, 201, { message: "Job posted successfully", data: job });
  } catch (error) {
    sendResponse(res, 500, {
      message: "Server error",
      error: (error as Error).message,
    });
  }
};
