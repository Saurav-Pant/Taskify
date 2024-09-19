import { Router, Request, Response } from "express";
import { PrismaClient, TaskStatus } from "@prisma/client";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();
const prisma = new PrismaClient();

router.get("/", authenticateToken, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const tasks = await prisma.task.findMany({ where: { userId } });
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Unable to fetch tasks" });
  }
});

router.post("/", authenticateToken, async (req: Request, res: Response) => {
  const { title, description, dateTime, priority, deadline, status } = req.body;
  const userId = (req as any).user.id;

  try {
    const deadlineDate = deadline ? new Date(deadline) : null;

    const deadlineISO = deadlineDate ? deadlineDate.toISOString() : null;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dateTime: dateTime ? new Date(dateTime) : null,
        priority: priority ? priority : null,
        deadline: deadlineISO,
        status: status as TaskStatus,
        user: {
          connect: { id: userId },
        },
      },
    });

    res.json(task);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Unable to create task" });
  }
});

router.put("/:id/status", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status },
    });
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ error: "Unable to update task status" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, dateTime, priority, deadline, status } = req.body;

  const deadlineDate = deadline ? new Date(deadline) : null;

  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        dateTime: dateTime ? new Date(dateTime) : null,
        priority,
        deadline: deadlineDate ? deadlineDate : null,
        status,
      },
    });
    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Unable to update task" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTask = await prisma.task.delete({
      where: { id },
    });
    res.json(deletedTask);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Unable to delete task" });
  }
});

export default router;
