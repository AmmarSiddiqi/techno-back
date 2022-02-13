import { Product, validate } from '../../models/product.js';
import handleRouteErrors from './../../handleRouteErrors.js';
import uploadImage from './../../upload/upload.js';

const addProduct = handleRouteErrors(async(req,res)=>{
    await validate({...req.body, picture: req.files, owner: req.user._id});
    req.body.picture = {}
    const imagesTags = Object.keys(req.files);
    for(let i=0; i< imagesTags.length; i++){
        const { url, id, error } = await uploadImage(req.files[imagesTags[i]]);
        if(url && id) req.body.picture[imagesTags[i]] = { url: url.webContentLink,id }
        else if(error) 
            return res.status(500).send({message:"There was an error uploading images",error})
    }
    const product = new Product({...req.body, owner: req.user._id});
    await product.save();
    res.send(product)
})

export default addProduct;