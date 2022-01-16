import { Request, Response, Router } from "express";
import { io } from "../createServer";
import { ISocket } from "../interface";

export const router: Router = Router();

const chat = io.of("/room/:roomId");

router.get("/", (req: Request, res: Response) => {
  console.log(__dirname);
  res.sendFile(__dirname + "/room.html");
});

router.get("/:roomId", (req: Request, res: Response) => {
  console.log(req.params.roomId);
  chat.on("connection", (socket: ISocket) => {
    socket.on("chat message", (data) => {
      console.log("message from client: ", data);

      const name = (socket.name = data.name);
      const room = (socket.room = data.room);

      // room에 join한다
      socket.join(room);
      // room에 join되어 있는 클라이언트에게 메시지를 전송한다
      chat.to(room).emit("chat message", data.msg);
    });
  });
});
