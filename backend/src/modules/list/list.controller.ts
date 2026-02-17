import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import {
  createList,
  getBoardLists,
  reorderLists,
  deleteList,
  getListById
} from "./list.service";

import { logActivity } from "../activity/activity.service";

export const create = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { boardId, title } = req.body;

    const list = await createList(boardId, title);

    await logActivity({
      boardId,
      userId: req.user!.userId,
      type: "list.created",
      payload: { listId: list.id, title }
    });

    const io = req.app.get("io");

    io.to(boardId).emit("list:created", list);

    // ⭐ REAL TIME ACTIVITY
    io.to(boardId).emit("activity:new", {
      type: "list.created",
      userId: req.user!.userId,
      payload: { listId: list.id, title },
      createdAt: new Date()
    });

    res.status(201).json(list);
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
    const boardId = req.params.boardId as string;
    const lists = await getBoardLists(boardId);
    res.json(lists);
  } catch (error) {
    next(error);
  }
};

export const reorder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { boardId, orderedIds } = req.body;

    await reorderLists(boardId, orderedIds);

    const io = req.app.get("io");
    io.to(boardId).emit("list:reordered", orderedIds);

    res.json({ message: "Lists reordered" });
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
    const listId = req.params.listId as string;

    const list = await getListById(listId);
    if (!list) return res.status(404).json({ message: "List not found" });

    await deleteList(listId);

    await logActivity({
      boardId: list.boardId,
      userId: req.user!.userId,
      type: "list.deleted",
      payload: { listId }
    });

    const io = req.app.get("io");

    io.to(list.boardId).emit("list:deleted", { listId });

    io.to(list.boardId).emit("activity:new", {
      type: "list.deleted",
      userId: req.user!.userId,
      payload: { listId },
      createdAt: new Date()
    });

    res.json({ message: "List deleted" });
  } catch (error) {
    next(error);
  }
};
