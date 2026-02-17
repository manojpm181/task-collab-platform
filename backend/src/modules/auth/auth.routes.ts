import { Router } from "express";
import { signup, login } from "./auth.controller";
import { validate } from "../../middleware/validate.middleware";
import { signupSchema, loginSchema } from "./auth.schema";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);


export default router;
