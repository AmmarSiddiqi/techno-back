import handleRouteErrors from './../../handleRouteErrors.js';
import { User } from '../../models/user.js';

const checkPhone = handleRouteErrors(async(req,res)=>{
    const { phoneNumber } = req.body;
    if(!phoneNumber) return res.status(400).send("Please provide phone number associated with your account");
    const user = await User.findOne({phoneNumber}).select("phoneNumber");
    if(!user) return res.status(404).send("Phone Number you've provided isn't correct");
    res.status(200).send("Success");
})

export default checkPhone;