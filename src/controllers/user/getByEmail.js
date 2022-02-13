import handleRouteErrors from './../../handleRouteErrors.js';
import { User } from "../../models/user.js";
import { compare } from 'bcrypt';

const getByEmail = handleRouteErrors(async(req,res)=>{
    const { email } = req.body;
    if(!email) return res.status(404).send("No email provided");
    const user = await User.findOne({email}).select('name email verified');
    if(!user) return res.status(404).send("We couldn't find any account associated with this email");
    const isVerified = await compare(process.env.trueSecret,user.verified);
    if(!isVerified) return res.status(400).send("You must verify your account first");
    user.verified = isVerified;
    res.status(200).send(user);
})

export default getByEmail;