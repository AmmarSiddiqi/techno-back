import express from "express";
import importRoutes from "./start/importRoutes.js";
import './start/envConfig.js';
import './start/config.js';
import "./start/connectDb.js";
import initSocket from "./start/initSocket.js";
import http from "http";
import messageSockets from "./sockets/message.js";
import { production } from "./constants/constants.js";

const app = express();
importRoutes(app);

const PORT = process.env.PORT || 3500
const server = production ? app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`)) :
http.createServer(app).listen({host: process.env.LOCALADDRESS, port: PORT},
    ()=>console.log(`Development Server IP: ${process.env.LOCALADDRESS} PORT: ${PORT}`))
    

const io = initSocket(server);
messageSockets(io)