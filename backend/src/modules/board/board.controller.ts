import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { createBoard, getUserBoards, deleteBoard } from "./board.service";
import { logActivity } from "../activity/activity.service";

export const create = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const board = await createBoard(name, req.user!.userId);

    await logActivity({
      boardId: board.id,
      userId: req.user!.userId,
      type: "board.created",
      payload: { name: board.name }
    });

    const io = req.app.get("io");

    io.to(board.id).emit("board:updated", board);

    io.to(board.id).emit("activity:new", {
      type: "board.created",
      userId: req.user!.userId,
      payload: { name: board.name },
      createdAt: new Date()
    });

    res.status(201).json(board);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const boards = await getUserBoards(req.user!.userId);
    res.json(boards);
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const boardId = req.params.boardId as string;

    await deleteBoard(boardId, req.user!.userId);

    const io = req.app.get("io");

    io.to(boardId).emit("board:updated", { boardId, deleted: true });

    io.to(boardId).emit("activity:new", {
      type: "board.deleted",
      userId: req.user!.userId,
      payload: { boardId },
      createdAt: new Date()
    });

    res.json({ message: "Board deleted" });
  } catch (error) {
    next(error);
  }
};
