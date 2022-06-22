import { Bid, validate } from '../../models/bid.js';
import handleRouteErrors from '../../handleRouteErrors.js';
import { Product } from '../../models/product.js';

const addBid = handleRouteErrors(async(req,res)=>{
    const { productId, price } = await validate(req.body);
    let bid = await Bid.findOne({productId ,by:req.user._id})
        .populate("by", "name email countryCode phoneNumber")
        .populate("productId", "title price owner isActive picture.image1");
    if(bid) {
        bid.price = price;
        bid.at = Date.now();
        await bid.save();
    }
    else{
        const product = await Product.findOne({_id: productId});
        if(!product) return res.status(400).send("Invalid Product Owner")
        if(req.user._id === product.owner.toString())
            return res.status(400).send("You can't bid against your own products")
        bid = new Bid({ productId, price, by:req.user._id, productOwner: product.owner.toString() });
        await bid.save();
        bid = await Bid.findOne({by:req.user._id, productOwner: product.owner.toString()})
            .populate("by", "name email countryCode phoneNumber")
            .populate("productId", "title price owner isActive picture.image1")
    }
    const limitedDataBid = {at: bid.at, price: bid.price, userId: bid.by, productId: bid.productId}
    res.status(200).send(bid);
});

export default addBid;