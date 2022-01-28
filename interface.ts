import { Socket, Server } from "socket.io";
import { Request } from "express";

export interface ISocket extends Socket {
  name?: string;
  userid?: string;
  room?: string;
}

export interface IRequest extends Request {
  io?: Server;
}

export interface Room {
  roomId: string;
  name: string;
}
