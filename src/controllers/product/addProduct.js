import { Product, validate } from '../../models/product.js';
import handleRouteErrors from './../../handleRouteErrors.js';
import cloudinary from "../../cloudinary/cloudinary.js";

const addProduct = handleRouteErrors(async(req,res)=>{
    await validate({...req.body, owner: req.user._id});
    
    const imagesTags = Object.keys(req.body.picture);
    for(let i=0; i< imagesTags.length; i++){
        const { url } = await cloudinary.uploader.upload(req.body.picture[imagesTags[i]],{
            upload_preset:'dev_setups',
        });
        if(url) req.body.picture[imagesTags[i]] = { url }
        else if(error) 
            return res.status(500).send({message:"There was an error uploading images",error})
    }
    const product = new Product({...req.body, owner: req.user._id});
    await product.save();
    res.status(200).send(product)
})

export default addProduct;