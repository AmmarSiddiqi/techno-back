import handleRouteErrors from "../../../handleRouteErrors.js";
import { User } from "../../../models/user.js";
import { genSalt, hash, compare } from "bcrypt";
import twilio from "twilio";
import validate from "./validate.js";

const updatePhone = handleRouteErrors(async (req, res) => {
    const { countryCode, phoneNumber } = await validate(req.body);
    const user = await User.findById(req.user._id);
    user.countryCode = countryCode;
    user.phoneNumber = phoneNumber;
    const salt = await genSalt(10);
    const hashed = await hash(process.env.falseSecret, salt);
    user.verified = hashed;
    user.phoneVerified = hashed;
    const phoneValidationKey = Math.floor(100000 + Math.random() * 900000);
    const client = twilio(process.env.accountSid, process.env.authToken);
    await client.messages.create({
        messagingServiceSid: process.env.messagingServiceSid,
        body: `Your verification key is: ${phoneValidationKey}`,
        to: `${user.countryCode + user.phoneNumber}`
    });
    let salt1 = await genSalt(10);
    let hashed1 = await hash(phoneValidationKey.toString(), salt1);
    user.phoneValidationKey = hashed1;
    await user.save();
    const token = await user.genAuthToken();
    user.password = undefined;
    user.verified = await compare(process.env.trueSecret, user.verified);
    res.status(200).send({token, user});
})

export default updatePhone;