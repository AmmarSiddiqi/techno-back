import handleRouteErrors from "../../handleRouteErrors.js";
import { User } from "../../models/user.js";
import * as yup from "yup";
import { compare } from "bcrypt";
import { genSalt } from "bcrypt";
import { hash } from "bcrypt";

const validate = async(body) => {
    const schema = yup.object({
        code: yup.string().min(6).max(6).required("Make sure the enter the code first")
    })
    return schema.validate(body);
}

const verify = handleRouteErrors(async(req,res) => {
    await validate(req.body);
    const user = await User.findById(req.user._id);
    const isCorrect = await compare(req.body.code, user.phoneValidationKey);
    if(!isCorrect) return res.status(400).send("Key you provided appears to be invalid");
    if(user.verified && await compare(process.env.trueSecret,user.verified))
        return res.status(400).send("Phone has already been verified");
    const salt = await genSalt(10);
    const hashed = await hash(process.env.trueSecret, salt);
    user.verified = hashed;
    user.phoneValidationKey = "";
    await user.save();
    const token = await user.genAuthToken();
    res.status(200).send(token);
})

export default verify;