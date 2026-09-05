import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest.middleware";
import { signinSchema, signupSchema } from "../schemas/auth.schema";
import {
    signUpController,
    signInController,
} from "../controllers/auth.controller";

const router = Router();

router.post("/signup", validateRequest(signupSchema), signUpController);

router.post("/signin", validateRequest(signinSchema), signInController);

export default router;
