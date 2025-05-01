import express from "express";
import { validate } from "../middleware/validate";
import { signUpSchema, loginSchema } from "../validations/auth.validation";
import { signup, login } from "../controllers/auth.controller.";
const router = express.Router();


router.post("/signup", validate(signUpSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;
