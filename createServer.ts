import express, { Express } from "express";
import http, { Server as sv } from "http";
import { Server } from "socket.io";

export const app: Express = express();
export const server: sv = http.createServer(app);
// http server를 socket.io server로 upgrade한다
export const io: Server = new Server(server);
