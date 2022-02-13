import { compare, genSalt, hash } from "bcrypt";
import handleRouteErrors from "../../handleRouteErrors.js";
import { User } from "../../models/user.js";

const changePassword = handleRouteErrors(async(req,res)=>{
    const { verificationCode, password, email } = req.body;
    if(!verificationCode || !password || !email)
        return res.status(400).send("Please provide relevent information")
    const user = await User.findOne({email});
    let isCodeCorrect = await compare(verificationCode, user.phoneValidationKey);
    if(!isCodeCorrect) isCodeCorrect = await compare(verificationCode, user.emailValidationKey);
    else if(!isCodeCorrect) return res.status(400).send("Code you entered is not valid");
    const salt = await genSalt(10);
    const hashed = await hash(password,salt);
    user.password = hashed;
    user.emailValidationKey = ""; user.phoneValidationKey = "";
    await user.save();
    res.status(200).send("Password Changed Successfully");
});

export default changePassword;