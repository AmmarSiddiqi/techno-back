import { production } from "../constants/constants";

const { messagingServiceSid,
    accountSid,authToken,jwtPrivateKey,trueSecret,
    origin,origin2, HOST } = process.env;
if ( !messagingServiceSid ||
    !accountSid || !authToken || !jwtPrivateKey || !trueSecret ||
    !origin) {
    console.log("Enviornment variables not set");
    process.exit(-1);
}
if(!production && (!HOST || !origin2)){
    console.log("HOST && origin2 not set in development server");
    process.exit(-1);
}



console.log('Check');