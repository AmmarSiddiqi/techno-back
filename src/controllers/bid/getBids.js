import { Bid } from '../../models/bid.js';
import handleRouteErrors from './../../handleRouteErrors.js';

const getBids = handleRouteErrors(async (req, res) => {
    const { pageNumber, pageSize, productId } = req.body;
    if (!pageNumber || !pageSize)
        return res.status(400).send("\"PageNumber\" & \"PageSize\" are required");
    if (!productId)
        return res.status(400).send("\"ProductID\" was not provided");
    let bids = await Bid.find({ productId }).sort({price: -1})
        .populate("by", "name email countryCode phoneNumber")
        .skip((1 - parseInt(pageNumber)) * parseInt(pageSize))
        .limit(pageSize);
    if(!bids) return res.status(404).send("Product currently has no bids");
    else if(bids[0]?.productOwner.toString() === req.user._id)
        return res.status(200).send(bids);
    let bidsWithLimitedData = bids.map(bid => ({_id: bid._id,at: bid.at, price: bid.price, userId: bid.by._id, productId: bid.productId}))
    res.status(200).send(bidsWithLimitedData)
});

export default getBids;