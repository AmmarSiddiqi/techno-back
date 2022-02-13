import { Product } from '../../models/product.js';
import handleRouteErrors from './../../handleRouteErrors.js';

const removeFromFavourites = handleRouteErrors(async(req,res)=>{
    const {productId} = req.body;
    const { modifiedCount } = await Product.updateOne(
        {_id: productId}, 
        {$pull: { "favourites": req.user._id }}
    )
    if(!modifiedCount) return res.status(400).send("Product not removed from favourites")
    res.status(200).send("Product removed from favourites");
});

export default removeFromFavourites;