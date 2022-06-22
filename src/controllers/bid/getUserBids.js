import { Bid } from '../../models/bid.js';
import handleRouteErrors from './../../handleRouteErrors.js';

const getUserBids = handleRouteErrors(async(req,res)=>{
    const userId = req.user._id;
    const bids = await Bid.find({$or: [{by: userId},{productOwner: userId}]})
    .populate("by", "name email countryCode phoneNumber")
    .populate("productId", "title price owner isActive picture.image1")
    res.status(200).send(bids);
})

export default getUserBids;