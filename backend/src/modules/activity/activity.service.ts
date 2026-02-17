import { prisma } from "../../utils/prisma";

export const logActivity = async ({
  boardId,
  userId,
  type,
  payload
}: {
  boardId: string;
  userId: string;
  type: string;
  payload: any;
}) => {
  return prisma.activity.create({
    data: {
      boardId,
      userId,
      type,
      payload
    }
  });
};
