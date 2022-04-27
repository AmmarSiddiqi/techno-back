import handleRouteErrors from "../../handleRouteErrors.js";
import { User, validate } from "../../models/user.js";
import { genSalt, hash } from "bcrypt";

const signup = handleRouteErrors(async(req,res)=>{
    const validated = await validate(req.body);
    let exists = await User.findOne({email: req.body.email});
    if(exists) return res.status(400).send("You've already registered");
    const user = new User(validated);
    const salt = await genSalt(10);
    const hashedPass = await hash(user.password,salt);
    const verifyHash = await hash(process.env.falseSecret,salt);
    user.password = hashedPass;
    user.verified = verifyHash;
    await user.save();
    const token = await user.genAuthToken();
    let userToSend = {
        _id:user._id,
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