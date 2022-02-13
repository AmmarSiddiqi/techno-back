import { Bid } from '../../models/bid.js';
import handleRouteErrors from './../../handleRouteErrors.js';

const deleteBid = handleRouteErrors(async(req,res)=>{
    const { productId, userId } = req.body;
    if(!productId) return res.status(400).send("ProductId was not provided");
    if(userId) 
        await Bid.deleteOne({productId: productId, productOwner: req.user._id, by: userId})
    else
        await Bid.deleteOne({productId, by: req.user._id});
    res.status(200).send("Request to delete bid processed!");
});

export default deleteBid;