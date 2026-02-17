import { prisma } from "../../utils/prisma";

export const createList = async (
  boardId: string,
  title: string
) => {

  const lastList = await prisma.list.findFirst({
    where: { boardId },
    orderBy: { position: "desc" }
  });

  const newPosition = lastList ? lastList.position + 1 : 0;

  return prisma.list.create({
    data: {
      title,
      boardId,
      position: newPosition
    }
  });
};

export const getBoardLists = async (boardId: string) => {
  return prisma.list.findMany({
    where: { boardId },
    orderBy: { position: "asc" }
  });
};

export const reorderLists = async (
  boardId: string,
  orderedIds: string[]
) => {
  const updates = orderedIds.map((id, index) =>
    prisma.list.update({
      where: { id },
      data: { position: index }
    })
  );

  return prisma.$transaction(updates);
};

export const deleteList = async (listId: string) => {
  return prisma.list.delete({
    where: { id: listId }
  });
};

export const getListById = async (listId: string) => {
  return prisma.list.findUnique({
    where: { id: listId }
  });
};
