// routes/jobRoutes.ts
import express from "express";
import { postJob } from "../controllers/jobController";
import { authenticate } from "../middleware/auth";  
import { validate } from "../middleware/validate"; 
import { jobPostSchema } from "../validations/job.validation"; 

const router = express.Router();

// Route for posting jobs
router.post("/", authenticate(["employer"]), validate(jobPostSchema), postJob);

export default router;
