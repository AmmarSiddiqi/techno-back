
const { messagingServiceSid,
    accountSid,authToken,jwtPrivateKey,trueSecret,
    origin,origin2,
    verifiedSender,CLIENT_ID,
    CLIENT_SECRET,REDIRECT_URI,
    REFRESH_TOKEN, LOCALADDRESS } = process.env;
if ( !messagingServiceSid ||
    !accountSid || !authToken || !jwtPrivateKey || !trueSecret ||
    !origin || !verifiedSender ||
    !CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI || !REFRESH_TOKEN) {
    console.log("Enviornment variables not set");
    process.exit(-1);
}
