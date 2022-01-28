import { Request, Response, Router } from "express";
import { io } from "../../createServer";
import { ISocket, IRequest } from "../../interface";

export const roomRouter: Router = Router();

const room = io.of("/chat/room");
let roomId: string = "";

roomRouter.get("/", (req: Request, res: Response) => {
  res.render("room");
});

roomRouter.get("/:roomId", (req: Request, res: Response) => {
  roomId = req.params.roomId;
  console.log(roomId);
  res.render("room");
});

room.on("connection", (socket: ISocket) => {
  console.log("visited room?");
});
