import { Response, NextFunction } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { prisma } from "../../utils/prisma";
import {
  createTask,
  getListTasks,
  updateTask,
  deleteTask,
  moveTask,
  getTaskById,
  getListBoardId
} from "./task.service";

import { logActivity } from "../activity/activity.service";

export const create = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { listId, title, description } = req.body;

    const task = await createTask(listId, title, description);
    const boardId = await getListBoardId(listId);

    await logActivity({
      boardId,
      userId: req.user!.userId,
      type: "task.created",
      payload: { taskId: task.id, title }
    });

    const io = req.app.get("io");

    io.to(boardId).emit("task:created", task);

    io.to(boardId).emit("activity:new", {
      type: "task.created",
      userId: req.user!.userId,
      payload: { taskId: task.id, title },
      createdAt: new Date()
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req: AuthRequest, res: Response) => {
  const listId = req.params.listId as string;
  const { cursor, limit = 20, search } = req.query;

  const tasks = await prisma.task.findMany({
    where: {
      listId,
      ...(search && {
        title: {
          contains: String(search),
          mode: "insensitive"
        }
      })
    },
    orderBy: { createdAt: "desc" },
    take: Number(limit),

    ...(cursor && {
      skip: 1,
      cursor: { id: String(cursor) }
    })
  });

  const nextCursor =
    tasks.length > 0 ? tasks[tasks.length - 1].id : null;

  res.json({
    data: tasks,
    nextCursor
  });
};


export const update = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskId = req.params.taskId as string;

    const updated = await updateTask(taskId, req.body);
    const boardId = await getListBoardId(updated.listId);

    await logActivity({
      boardId,
      userId: req.user!.userId,
      type: "task.updated",
      payload: { taskId }
    });

    const io = req.app.get("io");

    io.to(boardId).emit("task:updated", updated);

    io.to(boardId).emit("activity:new", {
      type: "task.updated",
      userId: req.user!.userId,
      payload: { taskId },
      createdAt: new Date()
    });

    res.json(updated);
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
    const taskId = req.params.taskId as string;

    const task = await getTaskById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const boardId = await getListBoardId(task.listId);

    await deleteTask(taskId);

    await logActivity({
      boardId,
      userId: req.user!.userId,
      type: "task.deleted",
      payload: { taskId }
    });

    const io = req.app.get("io");

    io.to(boardId).emit("task:deleted", { taskId });

    io.to(boardId).emit("activity:new", {
      type: "task.deleted",
      userId: req.user!.userId,
      payload: { taskId },
      createdAt: new Date()
    });

    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};

export const move = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      taskId,
      sourceListId,
      destinationListId,
      destinationIndex
    } = req.body;

    await moveTask(taskId, sourceListId, destinationListId, destinationIndex);

    const boardId = await getListBoardId(sourceListId);

    await logActivity({
      boardId,
      userId: req.user!.userId,
      type: "task.moved",
      payload: {
        taskId,
        fromListId: sourceListId,
        toListId: destinationListId,
        position: destinationIndex
      }
    });

    const io = req.app.get("io");

    io.to(boardId).emit("task:moved", {
      taskId,
      from: sourceListId,
      to: destinationListId,
      destinationIndex
    });

    io.to(boardId).emit("activity:new", {
      type: "task.moved",
      userId: req.user!.userId,
      payload: {
        taskId,
        fromListId: sourceListId,
        toListId: destinationListId,
        position: destinationIndex
      },
      createdAt: new Date()
    });

    res.json({ message: "Task moved successfully" });
  } catch (error) {
    next(error);
  }
};
