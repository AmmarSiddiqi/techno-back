import handleRouteErrors from "../../handleRouteErrors.js";
import { User } from "../../models/user.js";
import { compare, genSalt, hash } from "bcrypt";

const verifyPhone = handleRouteErrors(async(req,res)=>{
    const { code } = req.body;
    const user = await User.findById(req.user?._id);
    if(!user) return res.status(404).send("You must register before verifying Email");
    if(user.phoneVerified && await compare(process.env.trueSecret,user.phoneVerified))
        return res.status(400).send("Phone has already been verified");
    const isPhoneKeyCorrect = await compare(code,user.phoneValidationKey);
    if(!isPhoneKeyCorrect) return res.status(400).send("Key you provided isn't valid");
    const salt = await genSalt(10);
    const hashed = await hash(process.env.trueSecret, salt);
    user.phoneVerified = hashed;
    user.phoneValidationKey = "";
    if(user.emailVerified) {
        const isEmailKeyCorrect = await compare(process.env.trueSecret,user.emailVerified);
        if(!isEmailKeyCorrect) return;
        const newSalt = await genSalt(10);
        const newHash = await hash(process.env.trueSecret, newSalt);
        user.verified = newHash;
    }
    await user.save();
    res.status(200).send("Phone has been verified");
});

export default verifyPhone;