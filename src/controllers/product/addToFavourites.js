import { Product } from '../../models/product.js';
import handleRouteErrors from './../../handleRouteErrors.js';

const addToFavourites = handleRouteErrors(async(req,res)=>{
    const { productId } = req.body
    const {modifiedCount} = await Product.updateOne(
        {_id: productId, favourites: { $nin: [req.user._id]}},
        {"$push": { "favourites": req.user._id }});
    if(!modifiedCount) return res.status(400).send("Product can't be added to favourites")
    res.status(200).send({modifiedCount});
});

export default addToFavourites;