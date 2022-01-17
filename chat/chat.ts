import { Request, Response, Router } from "express";
import { io } from "../createServer";
import { ISocket } from "../interface";

export const router: Router = Router();

const chat = io.of("/chat");

router.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/chat.html");
});

router.get("/:roomId", (req: Request, res: Response) => {
  console.log("visited1");
  console.log(req.params.roomId);
});

chat.on("connection", (socket: ISocket) => {
  socket.on("join-room", (id) => {
    console.log("visited2");
    socket.join(id);
    console.log(id);
  });
});
