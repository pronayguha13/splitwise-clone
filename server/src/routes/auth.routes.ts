import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest.middleware";
import {
    refreshSchema,
    signinSchema,
    signupSchema,
} from "../schemas/auth.schema";
import {
    signUpController,
    signInController,
    refreshController,
} from "../controllers/auth.controller";

const router = Router();

router.post("/signup", validateRequest(signupSchema), signUpController);

router.post("/signin", validateRequest(signinSchema), signInController);

router.post("/refresh", validateRequest(refreshSchema), refreshController);

export default router;
