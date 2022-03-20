import http from "http";
import os from "os";
import { production } from './../constants/constants.js';

class Server {
    PORT = process.env.PORT || 3500;

    constructor(app){
        if(!production) this.createDevelopmentServer(app);
        if(production) this.createProductionServer(app);
    }

    createDevelopmentServer(app){
        const networkInterfaces = os.networkInterfaces();
        const networkTypes = Object.values(networkInterfaces).reduce((a,b) => a.concat(b));
        const {address} = networkTypes.find(type => type.family === "IPv4" && type.address.indexOf("18")!==-1);
        return http.createServer(app).listen(
            {host: address, port: this.PORT},
            ()=>console.log(`Development Server IP: ${address} PORT: ${this.PORT}`))
    }

    createProductionServer(app){
        return app.listen(this.PORT,
            ()=>console.log(`Production Server started at ${this.PORT}`));
    }
}

export default Server;