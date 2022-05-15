import handleRouteErrors from "../../../handleRouteErrors.js";
import { User } from "../../../models/user.js";
import validate from "./validate.js";

const changeName = handleRouteErrors(async(req,res) => {
    const { name } = await validate(req.body);
    await User.updateOne({_id: req.user._id},{ name });
    res.status(200).send("Your name was successfully updated");
})

export default changeName;