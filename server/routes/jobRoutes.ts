import express from "express";
import { getAllJobs, postJob, matchJobs } from "../controllers/jobController";
import { authenticate } from "../middleware/auth";  
import { validate } from "../middleware/validate"; 
import { jobPostSchema } from "../validations/job.validation"; 

const router = express.Router();

// Route for posting jobs
router.post("/", authenticate(["employer"]), validate(jobPostSchema), postJob);


// public api getJobs
router.get("/", getAllJobs); 

router.get("/match", authenticate(["candidate"]), matchJobs);

export default router;
