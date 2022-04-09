import express from "express";
import importRoutes from "./start/importRoutes.js";
import './start/envConfig.js';
import './start/config.js';
import "./start/connectDb.js";
import initSocket from "./start/initSocket.js";
import http from "http";

const app = express();
importRoutes(app);

const PORT = process.env.PORT || 3500
const server = http.createServer(app).listen({host: "192.168.18.4", port: PORT},
    ()=>console.log(`Development Server IP: "192.168.18.4" PORT: ${PORT}`))

const io = initSocket(server);
// messageSockets(io)
io.on("connect", (socket) => {
    socket.on("joinMyId", id => {
        socket.join(id);
    })
    socket.on("message", (data) => { 
        io.to(data.id).emit("notification", data);
        io.to(data.id).emit("user-message",data);
        io.to(data.sender).emit("user-message",data);
    })
})