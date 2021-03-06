import { Request, Response, Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { io } from "../createServer";
import { ISocket } from "../interface";
import { roomRouter } from "./room";
import { Room } from "../interface";

export const chatRouter: Router = Router();

const chat = io.of("/chat");
chatRouter.use("/room", roomRouter);

let rooms: Array<Room> = [];

chatRouter.get("/", (req: Request, res: Response) => {
  res.render("chat", { rooms });
});

chatRouter.post("/join-room", (req: Request, res: Response) => {
  const roomId: string = uuidv4();
  rooms.push({ roomId, name: req.body.name });
  res.json({ url: `/chat/room/${roomId}`, roomId, name: req.body.name });
});

chatRouter.post("/click-room", (req: Request, res: Response) => {
  const { roomId } = req.body;
  res.redirect(`/chat/room/${roomId}`);
});

chat.on("connection", (socket: ISocket) => {
  console.log("Connected Chat Namespace");

  socket.on("join-room", (data: any) => {
    const roomId: string = data.roomId;
    socket.join(roomId);
    chat.to(roomId).emit("user-connected", "user-connected");
    chat.on("send", (message) => {
      console.log(message);
    });
  });

  socket.on("disconnect", (data: any) => {
    const roomId: string = data.roomId;
    socket.leave(roomId);
    console.log(`Leaved at ${roomId} room`);
  });
});
