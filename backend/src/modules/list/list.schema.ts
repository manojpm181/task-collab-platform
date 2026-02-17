import { z } from "zod";

export const createListSchema = z.object({
  body: z.object({
    boardId: z.string().uuid(),
    title: z.string().min(1)
  })
});

export const reorderListSchema = z.object({
  body: z.object({
    boardId: z.string().uuid(),
    orderedIds: z.array(z.string().uuid())
  })
});
