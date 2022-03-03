import handleRouteErrors from "../../handleRouteErrors.js";
import { compare } from "bcrypt";
import { User } from "../../models/user.js";

const login = handleRouteErrors(async(req,res)=>{
    const { email, password } = req.body;
    if(!email) return res.status(400).send("Please provide an email");
    if(!password) return res.status(400).send("Please provide a valid password");
    const user = await User.findOne({email}).select("name email countryCode phoneNumber verified favourites password image");
    if(!user) return res.status(404).send("Email or Password isn't correct");
    const passCheck = await compare(password,user.password);
    if(!passCheck) return res.status(400).send("Email or Password isn't correct");
    const token = await user.genAuthToken();
    user.password = undefined;
    res.status(200).send({user,token});
});

export default login;