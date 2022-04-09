import handleRouteErrors from "../../handleRouteErrors.js";
import { User } from "../../models/user.js";
import twilio from "twilio";
import { genSalt, hash } from "bcrypt";

const forgotPassword = handleRouteErrors(async (req, res) => {
    const { method, phoneNumber, countryCode, email } = req.body;
    if (!method) return res.status(400).send("Please provide necessary information");
    if (!phoneNumber || !countryCode || !email)
        return res.status(400).send("Please provide necessary information");
    let user = await User.findOne({ email });
    if (!user) return res.status(404).send("Account you've requested doesn't exist");
    const isPhoneNumberSame = user.phoneNumber === phoneNumber;
    const isCountryCodeSame = user.countryCode === countryCode;
    if (!isPhoneNumberSame) return res.status(400).send("Phone number doesn't match");
    if (!isCountryCodeSame) return res.status(400).send("Country code doesn't match");
    let phoneValidationKey = Math.floor(100000 + Math.random() * 900000);
    const client = twilio(process.env.accountSid, process.env.authToken);
    await client.messages.create({
        messagingServiceSid: process.env.messagingServiceSid,
        body: `Your verification key is: ${phoneValidationKey}`,
        to: `${user.countryCode + phoneNumber}`
    });
    let salt = await genSalt(10);
    let hashed = await hash(phoneValidationKey.toString(), salt);
    user.phoneValidationKey = hashed;
    await user.save();
    res.status(200).send("Verifcation code sent to your phone");
});

export default forgotPassword;