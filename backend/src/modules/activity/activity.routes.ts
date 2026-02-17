import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { getBoardActivity } from "./activity.controller";

const router = Router();

router.get("/:boardId", authenticate, getBoardActivity);

export default router;
