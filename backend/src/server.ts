import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import boardRoutes from "./modules/board/board.routes";
import listRoutes from "./modules/list/list.routes";
import taskRoutes from "./modules/task/task.routes";

import { setupSocket } from "./socket/socket";
import { errorHandler } from "./middleware/error.middleware";
import activityRoutes from "./modules/activity/activity.routes";



dotenv.config();

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: { origin: "*" }
});

setupSocket(io);

app.set("io", io);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/activity", activityRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});


app.use(errorHandler);

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
