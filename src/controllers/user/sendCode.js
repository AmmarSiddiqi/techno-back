import handleRouteErrors from "../../handleRouteErrors";
import { User } from "../../models/user";
import twilio from "twilio";
import { genSalt, hash } from "bcrypt";

const sendCode = handleRouteErrors(async(req,res) => {
    const user = await User.findById(req.user._id);
    const phoneValidationKey = Math.floor(100000 + Math.random() * 900000);
    const client = twilio(process.env.accountSid, process.env.authToken);
    await client.messages.create({
        messagingServiceSid: process.env.messagingServiceSid,
        body: `Your verification key is: ${phoneValidationKey}`,
        to: `${user.countryCode + user.phoneNumber}`
    });
    let salt = await genSalt(10);
    let hashed = await hash(phoneValidationKey.toString(), salt);
    user.phoneValidationKey = hashed;
    await user.save();
    res.status(200).send("Verifcation code sent to your phone");
})

export default sendCode;