import { User } from '../../models/user.js';
import handleRouteErrors from './../../handleRouteErrors.js';

const addToFavourites = handleRouteErrors(async(req,res)=>{
    const { productId } = req.body
    const {modifiedCount} = await User.updateOne(
        {_id: req.user._id, favourites: { $nin: [productId]}},
        {"$push": { "favourites": productId}});
    if(!modifiedCount) return res.status(400).send("Product can't be added to favourites")
    res.status(200).send({modifiedCount});
});

export default addToFavourites;