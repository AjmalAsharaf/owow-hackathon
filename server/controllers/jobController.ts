import { Request, Response } from "express";
import Job from "../models/Job";
import Profile from "../models/Profile";
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

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().populate("postedBy", "name email");
    sendResponse(res, 200, {
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (error) {
    sendResponse(res, 500, {
      message: "Server error",
      error: (error as Error).message,
    });
  }
};

// Match jobs based on candidate profile
export const matchJobs = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (req.user?.role !== "candidate") {
      sendResponse(res, 403, {
        message: "Forbidden: Only candidates can match jobs",
      });
      return;
    }

    // Get candidate profile
    const profile = await Profile.findOne({ user: req.user.userId });
    if (!profile) {
      sendResponse(res, 404, { message: "Candidate profile not found" });
      return;
    }
    const normalizeSkill = (skill: string) => skill.toLowerCase().replace(/[^a-z0-9]/g, "");

    const candidateSkills = profile.skills.map(normalizeSkill);

    // Get all jobs
    const jobs = await Job.find();

    const matchedJobs = jobs.map((job) => {
        // Normalize job skills as well
        const jobSkills = job.requiredSkills.map(normalizeSkill);
        const matchCount = jobSkills.filter((skill) =>
          candidateSkills.includes(skill)
        ).length;
        return { job, matchCount };
      });

    // Sort by match count descending
    matchedJobs.sort((a, b) => b.matchCount - a.matchCount);

    // Return only the job data
    const sortedJobs = matchedJobs.map((item) => item.job);

    sendResponse(res, 200, {
      message: "Matched jobs fetched successfully",
      data: sortedJobs,
    });
  } catch (error) {
    sendResponse(res, 500, {
      message: "Server error",
      error: (error as Error).message,
    });
  }
};
