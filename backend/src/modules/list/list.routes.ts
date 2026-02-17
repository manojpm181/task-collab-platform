import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { create, getAll, reorder, remove } from "./list.controller";

const router = Router();

router.post("/", authenticate, create);
router.get("/:boardId", authenticate, getAll);
router.put("/reorder", authenticate, reorder);
router.delete("/:listId", authenticate, remove);

export default router;
