// controllers/profileController.ts
import { Response } from "express";
import Profile from "../models/Profile";
import { sendResponse } from "../utils/responseBuilder";
import { AuthenticatedRequest } from "../middleware/auth";

export const createProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { skills, experience, resume } = req.body;

  try {
    const userId = req.user?.userId;
    if (!userId) {
      sendResponse(res, 401, { message: "Unauthorized" });
      return;
    }
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { $set: { skills, experience, resume } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    sendResponse(res, 200, {
      message: "Profile created or updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    sendResponse(res, 500, { message: "Server error",  error: (error as Error).message});
  }
};

export const getProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const profile = await Profile.findOne({ user: req.user?.userId });
    if (!profile) {
      sendResponse(res, 404, { message: "Profile not found" });
      return;
    }
    sendResponse(res, 200, { message: "Profile retrieved successfully", data: profile });
  } catch (error) {
    sendResponse(res, 500, { message: "Server error", error: (error as Error).message });
  }
};
