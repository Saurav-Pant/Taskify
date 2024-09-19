"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const prisma_1 = require("./config/prisma");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3002;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/auth", auth_1.default);
app.use("/tasks", tasks_1.default);
app.get("/", (req, res) => {
    res.send("Hello World! CHecking Build Command");
});
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
process.on("SIGINT", () => {
    server.close(() => {
        console.log("Server closed");
        prisma_1.prisma.$disconnect();
        process.exit(0);
    });
});
