import { Router, Response } from "express";
import { authenticate, AuthRequest } from "../../middleware/auth.middleware";

const router = Router();

router.get("/me", authenticate, (req: AuthRequest, res: Response) => {
  res.json({
    message: "Authenticated user",
    userId: req.user?.userId
  });
});

export default router;

