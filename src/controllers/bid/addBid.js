import { Bid, validate } from '../../models/bid.js';
import handleRouteErrors from '../../handleRouteErrors.js';
import { Product } from '../../models/product.js';

const addBid = handleRouteErrors(async(req,res)=>{
    await validate(req.body);
    const { productId, price } = req.body;
    const bid = await Bid.findOne({productId ,by:req.user._id}).catch(() => null);
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
        const newBid = new Bid({ productId, price, by:req.user._id, productOwner: product.owner.toString() });
        await newBid.save();
    }
    res.status(200).send("Success");
});

export default addBid;