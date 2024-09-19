import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/tasks";
import { prisma } from "./config/prisma";

dotenv.config();

const app = express();
const port = 3002;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Hello World! CHecking Build Command");
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server closed");
    prisma.$disconnect();
    process.exit(0);
  });
});
