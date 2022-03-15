import { User } from '../../models/user.js';
import handleRouteErrors from './../../handleRouteErrors.js';

const removeFromFavourites = handleRouteErrors(async(req,res)=>{
    const {productId} = req.body;
    const { modifiedCount } = await User.updateOne(
        {_id: req.user._id}, 
        {$pull: { "favourites": productId }}
    )
    if(!modifiedCount) return res.status(400).send("Product not removed from favourites")
    res.status(200).send("Product removed from favourites");
});

export default removeFromFavourites;