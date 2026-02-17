import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware";
import { create, getAll, update, remove, move } from "./task.controller";
import { validate } from "../../middleware/validate.middleware";
import { createTaskSchema, moveTaskSchema } from "./task.schema";


const router = Router();

router.post(
  "/",
  authenticate,
  validate(createTaskSchema),
  create
);
router.get("/:listId", authenticate, getAll);
router.put(
  "/move",
  authenticate,
  validate(moveTaskSchema),
  move
);
router.put("/:taskId", authenticate, update);
router.delete("/:taskId", authenticate, remove);

export default router;
