import { Product } from '../../models/product.js';
import handleRouteErrors from './../../handleRouteErrors.js';

const deleteProduct = handleRouteErrors(async(req,res)=>{
    const { deletedCount } = await Product.deleteOne({_id: req.body._id, owner: req.user._id});
    if(deletedCount) return res.status(200).send("Product was deleted");
    res.status(400).send("Product was not deleted")
})

export default deleteProduct;