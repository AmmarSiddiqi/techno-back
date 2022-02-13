import http from "http";
import os from "os";
import { production } from './../constants/constants.js';

class Server {
    PORT = process.env.PORT || 3500;
    DEV_HOST = os.networkInterfaces()["Ethernet"].find(item => item.family === "IPv4");

    constructor(app){
        if(!production) this.createDevelopmentServer(app);
        if(production) this.createProductionServer(app);
    }

    createDevelopmentServer(app){
        return http.createServer(app).listen(
            {host: this.DEV_HOST.address, port: this.PORT},
            ()=>console.log(`Development Server IP: ${this.DEV_HOST.address} PORT: ${this.PORT}`))
    }

    createProductionServer(app){
        return app.listen(this.PORT,
            ()=>console.log(`Production Server started at ${this.PORT}`));
    }
}

export default Server;