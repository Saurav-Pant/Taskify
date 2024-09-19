"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
router.get("/", authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    try {
        const tasks = yield prisma.task.findMany({ where: { userId } });
        res.json(tasks);
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Unable to fetch tasks" });
    }
}));
router.post("/", authMiddleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, dateTime, priority, deadline, status } = req.body;
    const userId = req.user.id;
    try {
        const deadlineDate = deadline ? new Date(deadline) : null;
        const deadlineISO = deadlineDate ? deadlineDate.toISOString() : null;
        const task = yield prisma.task.create({
            data: {
                title,
                description,
                dateTime: dateTime ? new Date(dateTime) : null,
                priority: priority ? priority : null,
                deadline: deadlineISO,
                status: status,
                user: {
                    connect: { id: userId },
                },
            },
        });
        res.json(task);
    }
    catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Unable to create task" });
    }
}));
router.put("/:id/status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedTask = yield prisma.task.update({
            where: { id },
            data: { status },
        });
        res.json(updatedTask);
    }
    catch (error) {
        console.error("Error updating task status:", error);
        res.status(500).json({ error: "Unable to update task status" });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description, dateTime, priority, deadline, status } = req.body;
    const deadlineDate = deadline ? new Date(deadline) : null;
    try {
        const updatedTask = yield prisma.task.update({
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
    }
    catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Unable to update task" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedTask = yield prisma.task.delete({
            where: { id },
        });
        res.json(deletedTask);
    }
    catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Unable to delete task" });
    }
}));
exports.default = router;
