import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const initSocket = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*"
    }
  });


  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) throw new Error("No token");

      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      socket.data.userId = decoded.userId;

      next();
    } catch {
      next(new Error("Unauthorized socket"));
    }
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.data.userId);

    socket.on("join-board", (boardId: string) => {
      socket.join(boardId);
    });

    socket.on("leave-board", (boardId: string) => {
      socket.leave(boardId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.data.userId);
    });
  });

  return io;
};
