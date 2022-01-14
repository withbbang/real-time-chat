import express, { Request, Response } from "express";
import http from "http";
import { str } from "./module";
const app = express();
const server = http.createServer(app);
const PORT: Number = 3000;
// http server를 socket.io server로 upgrade한다
const io = require("socket.io")(server);

app.get("/", (req: Request, res: Response) => {
  res.send(str);
});

server.listen(PORT || 3000, function () {
  console.log(`Socket IO server listening on ${PORT}`);
});
