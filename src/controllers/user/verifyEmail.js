import handleRouteErrors from "../../handleRouteErrors.js";
import { User } from "../../models/user.js";
import { compare, genSalt, hash } from "bcrypt";

const verifyEmail = handleRouteErrors(async(req,res)=>{
    const { code } = req.body;
    const user = await User.findById(req.user?._id);
    if(!user) return res.status(404).send("You must register before verifying Email");
    if(user.emailVerified && await compare(process.env.trueSecret,user.emailVerified))
        return res.status(400).send("Email has already been verified");
    const isEmailKeyCorrect = await compare(code,user.emailValidationKey);
    if(!isEmailKeyCorrect) return res.status(400).send("Key you provided isn't valid");
    const salt = await genSalt(10);
    const hashed = await hash(process.env.trueSecret, salt);
    user.emailVerified = hashed;
    user.emailValidationKey = "";
    if(user.phoneVerified) {
        const isPhoneKeyCorrect = await compare(process.env.trueSecret,user.phoneVerified);
        if(!isPhoneKeyCorrect) return;
        const newSalt = await genSalt(10);
        const newHash = await hash(process.env.trueSecret, newSalt);
        user.verified = newHash;
    }
    await user.save();
    res.status(200).send("Email has been verified");
});

export default verifyEmail;