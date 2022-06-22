import express from "express";
import './start/envConfig.js';
import './start/config.js';
import "./start/connectDb.js";
import importRoutes from "./start/importRoutes.js";
import initSocket from "./start/initSocket.js";
import http from "http";
import messageSockets from "./sockets/message.js";
import { production } from "./constants/constants.js";

const app = express();
importRoutes(app);

const PORT = process.env.PORT || 3500
const server = production ? app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`)) :
http.createServer(app).listen({host: '192.168.18.4',port: PORT},
    ()=>console.log(`Development Server PORT: ${PORT}`))
    

const io = initSocket(server);
messageSockets(io)