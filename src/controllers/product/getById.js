import { Product } from '../../models/product.js';
import handleRouteErrors from './../../handleRouteErrors.js';

const getById = handleRouteErrors(async(req,res)=>{
    const { id } = req.params;
    const product = await Product.findById(id)
    .populate("owner","name email countryCode phoneNumber")
    .populate("location")
    .catch(()=>null);
    if(!product) return res.status(404).send("No Product was found with this Id");
    res.status(200).send(product);
});

export default getById;