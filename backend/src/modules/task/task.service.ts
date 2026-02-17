import { prisma } from "../../utils/prisma";

export const createTask = async (
  listId: string,
  title: string,
  description?: string
) => {
  const lastTask = await prisma.task.findFirst({
    where: { listId },
    orderBy: { position: "desc" }
  });

  const newPosition = lastTask ? lastTask.position + 1 : 0;

  return prisma.task.create({
    data: {
      title,
      description,
      listId,
      position: newPosition
    }
  });
};

export const getListTasks = async (listId: string) => {
  return prisma.task.findMany({
    where: { listId },
    orderBy: { position: "asc" }
  });
};

export const updateTask = async (
  taskId: string,
  data: {
    title?: string;
    description?: string;
    assignedTo?: string;
  }
) => {
  return prisma.task.update({
    where: { id: taskId },
    data
  });
};

export const deleteTask = async (taskId: string) => {
  return prisma.task.delete({
    where: { id: taskId }
  });
};

export const getTaskById = async (taskId: string) => {
  return prisma.task.findUniqueOrThrow({
    where: { id: taskId }
  });
};

export const getListBoardId = async (listId: string) => {
  const list = await prisma.list.findUnique({
    where: { id: listId },
    select: { boardId: true }
  });

  if (!list) throw new Error("List not found");

  return list.boardId;
};

export const moveTask = async (
  taskId: string,
  sourceListId: string,
  destinationListId: string,
  destinationIndex: number
) => {
  return prisma.$transaction(async (tx) => {
    
    await tx.task.updateMany({
      where: {
        listId: destinationListId,
        position: {
          gte: destinationIndex
        }
      },
      data: {
        position: { increment: 1 }
      }
    });

    
    await tx.task.update({
      where: { id: taskId },
      data: {
        listId: destinationListId,
        position: destinationIndex
      }
    });

    
    const sourceTasks = await tx.task.findMany({
      where: { listId: sourceListId },
      orderBy: { position: "asc" }
    });

    for (let i = 0; i < sourceTasks.length; i++) {
      await tx.task.update({
        where: { id: sourceTasks[i].id },
        data: { position: i }
      });
    }

    return { message: "Task moved" };
  });
};
