import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { create, getAll, remove } from "./board.controller";

const router = Router();

router.post("/", authenticate, create);
router.get("/", authenticate, getAll);
router.delete("/:boardId", authenticate, remove);

export default router;
