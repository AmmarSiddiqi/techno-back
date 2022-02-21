import handleRouteErrors from './../../handleRouteErrors.js';
import { User } from '../../models/user.js';

const getUser = handleRouteErrors(async(req,res)=>{
    const user = await User.findById(req.user._id)
        .select("name email countryCode phoneNumber verified favourites image")
        .catch(()=>null)
    if(!user) return res.status(404).send("No user was found against this token");
    res.status(200).send(user);
});

export default getUser;