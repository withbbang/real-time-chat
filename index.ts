import express, { Request, Response } from "express";
import { app, server, io } from "./createServer";
import { ISocket } from "./interface";
import { roomRouter } from "./room";
const PORT: Number = 4000;

app.use(express.static("public"));
app.use("/chat", roomRouter);

app.get("/", (req: Request, res: Response) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket: ISocket) => {
  socket.on("login", (data) => {
    console.log(
      "Client logged-in:\n name:" + data.name + "\n userid: " + data.userid,
    );

    // socket에 클라이언트 정보를 저장한다
    socket.name = data.name;
    socket.userid = data.userid;

    // 접속된 모든 클라이언트에게 메시지를 전송한다
    io.emit("login", data.name);
  });

  // 클라이언트로부터의 메시지가 수신되면
  socket.on("chat", (data) => {
    console.log("Message from %s: %s", socket.name, data.msg);

    const msg = {
      from: {
        name: socket.name,
        userid: socket.userid,
      },
      msg: data.msg,
    };

    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    socket.broadcast.emit("chat", msg);

    // 메시지를 전송한 클라이언트에게만 메시지를 전송한다
    // socket.emit('s2c chat', msg);

    // 접속된 모든 클라이언트에게 메시지를 전송한다
    // io.emit('s2c chat', msg);

    // 특정 클라이언트에게만 메시지를 전송한다
    // io.to(id).emit('s2c chat', data);
  });

  // force client disconnect from server
  socket.on("forceDisconnect", () => {
    socket.disconnect();
  });

  socket.on("disconnect", () => {
    console.log("user disconnected: " + socket.name);
  });
});

server.listen(PORT || 3000, () => {
  console.log(`Socket IO server listening on ${PORT}`);
});
