
const { messagingServiceSid,
    accountSid,
    authToken,
    sendGirdApiKey,
    jwtPrivateKey,
    verifiedSender,
    trueSecret,
    origin,
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    REFRESH_TOKEN } = process.env;
if (!messagingServiceSid ||
    !accountSid ||
    !authToken ||
    !sendGirdApiKey ||
    !jwtPrivateKey ||
    !verifiedSender ||
    !trueSecret ||
    !origin ||
    !CLIENT_ID ||
    !CLIENT_SECRET ||
    !REDIRECT_URI ||
    !REFRESH_TOKEN) {
    console.log("Enviornment variables not set");
    process.exit(-1);
}
