import { prisma } from "../../utils/prisma";
export const createBoard = async (name: string, ownerId: string) => {
  return prisma.board.create({
    data: {
      name,
      owner: {
        connect: { id: ownerId }
      },
      members: {
        create: {
          userId: ownerId,
          role: "OWNER"
        }
      }
    },
    include: {
      members: true
    }
  });
};

export const getUserBoards = async (userId: string) => {
  return prisma.board.findMany({
    where: {
      OR: [
        { ownerId: userId },
        { members: { some: { userId } } }
      ]
    },
    include: {
      members: {
        include: {
          user: {
            select: { id: true, email: true }
          }
        }
      }
    }
  });
};

export const deleteBoard = async (boardId: string, userId: string) => {
  const board = await prisma.board.findUnique({
    where: { id: boardId }
  });

  if (!board) throw new Error("Board not found");

  if (board.ownerId !== userId) {
    throw new Error("Only owner can delete board");
  }

  return prisma.board.delete({
    where: { id: boardId }
  });
};

export const searchBoards = async (
  userId: string,
  query: string
) => {
  return prisma.board.findMany({
    where: {
      OR: [
        { ownerId: userId },
        { members: { some: { userId } } }
      ],
      name: {
        contains: query,
        mode: "insensitive"
      }
    }
  });
};

