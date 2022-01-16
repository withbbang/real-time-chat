import { Socket } from "socket.io";

export interface ISocket extends Socket {
  name?: string;
  userid?: string;
  room?: string;
}
