import handleRouteErrors from './../../handleRouteErrors.js';
import { Product } from "../../models/product.js"

const getFavourites = handleRouteErrors(async(req,res) => {
    const { favourites } = req.body;
    const products = await Product.find({_id: {$in: favourites}, isActive:true})
        .select("title price city picture.image1 favourites owner createdAt updatedAt")
        .populate("location")
    res.status(200).send(products);
})

export default getFavourites;