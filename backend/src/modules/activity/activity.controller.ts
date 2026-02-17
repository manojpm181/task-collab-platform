import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { prisma } from "../../utils/prisma";

export const getBoardActivity = async (req: AuthRequest, res: Response) => {
  const boardId = req.params.boardId as string;
  const { cursor, limit = 20 } = req.query;

  const activity = await prisma.activity.findMany({
    where: { boardId },
    orderBy: { createdAt: "desc" },
    take: Number(limit),
    ...(cursor && {
      skip: 1,
      cursor: { id: String(cursor) }
    }),
    include: {
      user: {
        select: { id: true, email: true }
      }
    }
  });

  res.json(activity);
};

