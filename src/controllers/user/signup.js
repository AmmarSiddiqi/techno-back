import handleRouteErrors from "../../handleRouteErrors.js";
import { User, validate } from "../../models/user.js";
import twilio from "twilio";
import sendGirdMail from "@sendgrid/mail";
import { genSalt, hash } from "bcrypt";

const signup = handleRouteErrors(async(req,res)=>{
    const validated = await validate(req.body);
    let exists = await User.findOne({email: req.body.email});
    if(exists) return res.status(400).send("You've already registered");
    const user = new User(validated);
    const phoneValidationKey = Math.floor(100000 + Math.random() * 900000);
    const client = twilio(process.env.accountSid,process.env.authToken);
    await client.messages.create({ 
        messagingServiceSid: process.env.messagingServiceSid,
         body: `Your verification key is: ${phoneValidationKey}`,        
         to: `${user.countryCode + user.phoneNumber}` 
    });
    const emailValidationKey = Math.floor(100000 + Math.random() * 900000);
    sendGirdMail.setApiKey(process.env.sendGirdApiKey);
    const emailData = {
        to: user.email,
        from: process.env.verifiedSender,
        subject: 'Techno MarketPlace Email Verification',
        text: `Your verification code is: ${emailValidationKey}`
    }
    await sendGirdMail.send(emailData);
    const salt = await genSalt(10);
    const hashedPass = await hash(user.password,salt);
    const hashedPhoneKey = await hash(phoneValidationKey.toString(),salt);
    const hashedEmailKey = await hash(emailValidationKey.toString(),salt);
    user.password = hashedPass;
    user.phoneValidationKey = hashedPhoneKey;
    user.emailValidationKey = hashedEmailKey;
    await user.save();
    const token = user.genAuthToken();
    let userToSend = {
        name: user.name,
        email: user.email, 
        countryCode: user.countryCode, 
        phoneNumber: user.phoneNumber, 
        verified: user.verified, 
        favourites: user.favourites
    }
    res.status(200).send({user: userToSend,token}); 
})

export default signup;