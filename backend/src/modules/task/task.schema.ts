import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    listId: z.string().uuid(),
    title: z.string().min(1),
    description: z.string().optional()
  })
});

export const moveTaskSchema = z.object({
  body: z.object({
    taskId: z.string().uuid(),
    sourceListId: z.string().uuid(),
    destinationListId: z.string().uuid(),
    destinationIndex: z.number().int().min(0)
  })
});
