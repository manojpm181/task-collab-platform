import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const setupSocket = (io: Server) => {


  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      socket.data.user = decoded;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  
  io.on("connection", (socket) => {

    console.log("User connected:", socket.data.user);

    socket.on("join-board", (boardId: string) => {
      socket.join(boardId);
      console.log(`User joined board: ${boardId}`);
    });

    
    socket.on("leave-board", (boardId: string) => {
      socket.leave(boardId);
      console.log(`User left board: ${boardId}`);
    });

   
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

  });
};
