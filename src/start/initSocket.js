import { Server } from "socket.io";

const initSocket = (server) => {
    const io = new Server();
    io.attach(server,{cors:{
        origin:[process.env.origin,process.env.origin2],
        methods: ["GET","POST"]
    }});
    return io
}

export default initSocket;