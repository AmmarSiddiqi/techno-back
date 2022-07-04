import handleRouteErrors from './../../handleRouteErrors.js';
import { User } from '../../models/user.js';
import { Bid } from '../../models/bid.js';
import { compare } from 'bcrypt';

const getUser = handleRouteErrors(async(req,res)=>{
    const user = await User.findById(req.user._id)
        .select("name email countryCode phoneNumber verified favourites image")
        .catch(()=>null)
    if(!user) return res.status(404).send("No user was found against this token");
    const placedBids = await Bid.find({by: user._id})
    .populate("by", "name email countryCode phoneNumber")
    .populate("productId", "title price owner isActive picture.image1")
    
    const recievedBids = await Bid.find({productOwner: user._id})
    .populate("by", "name email countryCode phoneNumber")
    .populate("productId", "title price owner isActive picture.image1")
    
    const verified = await compare(process.env.trueSecret, user.verified);

    const users = {
        _id: user._id,
        name: user.name,
        email: user.email,
        countryCode: user.countryCode,
        phoneNumber: user.phoneNumber,
        verified,
        favourites: user.favourites,
        image: user.image,
        placedBids, recievedBids
    }
    res.status(200).send(users);
});

export default getUser;