import express from "express";
import importRoutes from "./start/importRoutes.js";
import './start/envConfig.js';
import './start/config.js';
import "./start/connectDb.js";
import initSocket from "./start/initSocket.js";
import http from "http";
import messageSockets from "./sockets/message.js";

const app = express();
importRoutes(app);

const PORT = process.env.PORT || 3500
const server = process.env.NODE_ENV?.trim() === "development" ? 
http.createServer(app).listen({host: "192.168.18.4", port: PORT},
    ()=>console.log(`Development Server IP: "192.168.18.4" PORT: ${PORT}`)) :
    app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`))

const io = initSocket(server);
messageSockets(io)