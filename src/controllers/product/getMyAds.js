import handleRouteErrors from './../../handleRouteErrors.js';
import { Product } from '../../models/product.js';

const getMyAds = handleRouteErrors(async(req,res) => {
    const products = await Product.find({owner: req.user._id})
        .sort({_id: -1})
        .populate("owner", "name email countryCode phoneNumber")
        .populate("location")
    if(!products) return res.status(404).send("You have not posted any ads yet! 😒😒😒😒");
    res.status(200).send(products)
})

export default getMyAds;