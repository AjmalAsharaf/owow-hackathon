import express from "express";
import { validate } from "../middleware/validate";
import { createProfileSchema } from "../validations/profile.validation";
import { authenticate } from "../middleware/auth";
import { createProfile, getProfile } from "../controllers/profileController";

const router = express.Router();

router.post("/", authenticate(),validate(createProfileSchema), createProfile);
router.get("/", authenticate(), getProfile);

export default router;
