import handleRouteErrors from "../../../handleRouteErrors.js";
import { User } from "../../../models/user.js";
import { genSalt, hash } from "bcrypt";
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
    await user.save();
    const token = await user.genAuthToken();
    user.password = undefined;
    res.status(200).send({token, user});
})

export default updatePhone;