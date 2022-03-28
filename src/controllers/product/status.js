import handleRouteErrors from "../../handleRouteErrors.js";
import { Product } from "../../models/product.js";

const visible = handleRouteErrors(async(req,res) => {
    const results = await Product.updateOne(
        {_id: req.body.id, owner: req.user._id},
        [{$set: {isActive: {$not: "$isActive"}}}])
    return res.status(200).send(results);
})

export default visible;